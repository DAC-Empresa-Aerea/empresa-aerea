package com.ms.saga.orchestrator;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ms.saga.dto.Roles;
import com.ms.saga.dto.auth.create.CreateAuthRequestDTO;
import com.ms.saga.dto.auth.create.CreateAuthResponseDTO;
import com.ms.saga.dto.customer.CreateCustomerDTO;
import com.ms.saga.dto.customer.CustomerRequestDTO;
import com.ms.saga.dto.customer.CustomerResponseDTO;
import com.ms.saga.dto.customer.delete.DeleteCustomerRequestDTO;
import com.ms.saga.dto.customer.delete.DeleteCustomerResponseDTO;

@Component
public class CreateCustomerSagaOrchestrator {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    private final Map<String, CompletableFuture<CreateCustomerDTO>> pendingRequests = new ConcurrentHashMap<>();

    private final Map<String, CustomerResponseDTO> temporaryClientStorage = new ConcurrentHashMap<>();

    public CompletableFuture<CreateCustomerDTO> processCreate(CustomerRequestDTO customerRequest) {
        String correlationId = UUID.randomUUID().toString();
        CompletableFuture<CreateCustomerDTO> future = new CompletableFuture<>();
        pendingRequests.put(correlationId, future);
        
        rabbitTemplate.convertAndSend(
                "create.customer.exchange",
                "create.customer",
                customerRequest,
                message -> {
                    message.getMessageProperties().setCorrelationId(correlationId);
                    message.getMessageProperties().setReplyTo("create.customer.auth.queue");
                    return message;
                });
        
        return future;
    }

    public void handleCreateCustomerResponse(CustomerResponseDTO customer, String correlationId) {
        if (customer.isCreated()) {
            CreateAuthRequestDTO authRequest = new CreateAuthRequestDTO(
                    customer.getEmail(),
                    Roles.CUSTOMER
            );
            
            rabbitTemplate.convertAndSend(
                    "create.customer.exchange",
                    "create.auth",
                    authRequest,
                    message -> {
                        message.getMessageProperties().setCorrelationId(correlationId);
                        message.getMessageProperties().setReplyTo("create.customer.auth.queue");
                        return message;
                    });

            temporaryClientStorage.put(correlationId, customer);
        } else {
            CompletableFuture<CreateCustomerDTO> future = pendingRequests.remove(correlationId);
            if (future != null) {
                future.completeExceptionally(new RuntimeException("Falha na criação do cliente"));
            }
        }
    }

    public void handleCreateAuthResponse(CreateAuthResponseDTO authResponse, String correlationId) {

        if(authResponse.isCreated()) {
            CreateCustomerDTO response = new CreateCustomerDTO();
            response.setAccessToken(authResponse.getAccessToken());
            response.setTokenType(authResponse.getTokenType());
            response.setUsuario(temporaryClientStorage.remove(correlationId));
            
            CompletableFuture<CreateCustomerDTO> future = pendingRequests.remove(correlationId);
            if (future != null) {
                future.complete(response);
            }
        } else {
            CustomerResponseDTO customer = temporaryClientStorage.remove(correlationId);
            if (customer != null) {
                DeleteCustomerRequestDTO deleteRequest = new DeleteCustomerRequestDTO();
                deleteRequest.setEmail(customer.getEmail());
    
                rabbitTemplate.convertAndSend(
                    "delete.customer.exchange",
                    "delete.customer",
                    deleteRequest
                );
            }
            
            CompletableFuture<CreateCustomerDTO> future = pendingRequests.remove(correlationId);
            if (future != null) {
                future.completeExceptionally(new RuntimeException("Falha na criação do cliente"));
            }
        }
        
    }

    public void handleDeleteCustomerResponse(DeleteCustomerResponseDTO deleteResponse) {
        String correlationId = deleteResponse.getCorrelationId();
        if (deleteResponse.isDeleted()) {
            System.out.println("Compensação concluída com sucesso para CorrelationId: " + correlationId);
        } else {
            System.err.println("Erro ao compensar cliente. CorrelationId: " + correlationId);
        }
    }
}
