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
                "create.customer.queue",
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
                    "create.auth.queue",
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
            CompletableFuture<CreateCustomerDTO> future = pendingRequests.remove(correlationId);
            if (future != null) {
                future.completeExceptionally(new RuntimeException("Falha na criação do cliente"));
            }
            temporaryClientStorage.remove(correlationId);
        }
        
    }
}
