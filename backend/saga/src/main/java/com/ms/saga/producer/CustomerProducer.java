package com.ms.saga.producer;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;

import com.ms.saga.dto.customer.CustomerRequestDTO;
import com.ms.saga.dto.customer.CustomerResponseDTO;
import com.ms.saga.dto.error.SagaResponse;

@Component
public class CustomerProducer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public SagaResponse<CustomerResponseDTO> sendCreateCustomer(CustomerRequestDTO dto) {
        return rabbitTemplate.convertSendAndReceiveAsType(
            "create.customer.exchange",
            "create.customer.routing.key",
            dto,
            new ParameterizedTypeReference<SagaResponse<CustomerResponseDTO>>() {}
        );
    }

    public void sendRollbackCustomer(Long customerId) {
        rabbitTemplate.convertAndSend(
            "rollback.customer.exchange",
            "rollback.customer.routing.key",
            customerId
        );
    }
}

