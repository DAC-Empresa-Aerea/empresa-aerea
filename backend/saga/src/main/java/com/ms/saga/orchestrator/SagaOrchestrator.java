package com.ms.saga.orchestrator;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;

import com.ms.saga.dto.Roles;
import com.ms.saga.dto.auth.create.CreateAuthRequestDTO;
import com.ms.saga.dto.auth.create.CreateAuthResponseDTO;
import com.ms.saga.dto.customer.CustomerRequestDTO;
import com.ms.saga.dto.customer.CustomerResponseDTO;

@Component
public class SagaOrchestrator {
    
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    public CustomerResponseDTO processCreateCustomer(CustomerRequestDTO customer) {
        CustomerResponseDTO response = rabbitTemplate.convertSendAndReceiveAsType("create.customer.exchange", "create.customer.routing.key", customer, new ParameterizedTypeReference<CustomerResponseDTO>() {});
        
        CreateAuthResponseDTO authResponse = rabbitTemplate.convertSendAndReceiveAsType("create.auth.exchange", "create.auth.routing.key", new CreateAuthRequestDTO(customer.getEmail(), Roles.CUSTOMER), new ParameterizedTypeReference<CreateAuthResponseDTO>() {});

        if (response == null || !authResponse.isSuccess()) {
            System.out.println("Erro: resposta de criação do cliente ou de autenticação inválida.");
            return null;
        }

        return response;
    }

}