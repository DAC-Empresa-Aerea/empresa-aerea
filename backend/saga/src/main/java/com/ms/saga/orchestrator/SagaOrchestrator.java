package com.ms.saga.orchestrator;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
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
        Object response = rabbitTemplate.convertSendAndReceive("create.customer.exchange", "create.customer.routing.key", customer);
        return (CustomerResponseDTO) response;


       // Object customerResponseObj = rabbitTemplate.convertSendAndReceive("create.customer.exchange", "create.customer.routing.key", customer);

        // CreateAuthRequestDTO authRequest = new CreateAuthRequestDTO(customer.getEmail(), Roles.CUSTOMER);
        // Object authResponseObj = 
        //     rabbitTemplate.convertSendAndReceive("create.auth.exchange", "create.auth.routing.key", authRequest);

        // if (!(customerResponseObj instanceof CustomerResponseDTO)) {
        //     System.out.println("Erro: resposta de criação do cliente inválida.");
        //     return null;
        // }
        
        // if (!(authResponseObj instanceof CreateAuthResponseDTO)) {
        //     System.out.println("Erro: resposta de criação de auth inválida.");
        //     return null;
        // }
        
        // CustomerResponseDTO createdCustomer = (CustomerResponseDTO) customerResponseObj;
        // CreateAuthResponseDTO createdAuth = (CreateAuthResponseDTO) authResponseObj;
        
        // if (!createdAuth.isSuccess()) {
        //     System.out.println("Erro: criação de auth falhou.");
        //     return null;
        // }
        
        // return createdCustomer;
    }

}