package com.ms.saga.consumer;

import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ms.saga.dto.auth.create.CreateAuthResponseDTO;
import com.ms.saga.dto.customer.CustomerResponseDTO;
import com.ms.saga.orchestrator.CreateCustomerSagaOrchestrator;

@Component
public class CreateCustomerConsumer {

    @Autowired
    private CreateCustomerSagaOrchestrator orchestrator;

    @RabbitListener(queues = "customer.created.queue")
    public void receiveCreateCustomerResponse(CustomerResponseDTO customer, Message message) {
        String correlationId = message.getMessageProperties().getCorrelationId();
        orchestrator.handleCreateCustomerResponse(customer, correlationId);
    }

    @RabbitListener(queues = "auth.created.queue")
    public void receiveCreateAuthResponse(CreateAuthResponseDTO auth, Message message) {
        String correlationId = message.getMessageProperties().getCorrelationId();
        orchestrator.handleCreateAuthResponse(auth, correlationId);
    }

}
