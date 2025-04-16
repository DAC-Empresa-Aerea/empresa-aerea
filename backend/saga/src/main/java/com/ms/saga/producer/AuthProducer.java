package com.ms.saga.producer;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;

import com.ms.saga.dto.auth.create.CreateAuthRequestDTO;
import com.ms.saga.dto.auth.create.CreateAuthResponseDTO;
import com.ms.saga.dto.error.SagaResponse;

@Component
public class AuthProducer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public SagaResponse<CreateAuthResponseDTO> sendCreateAuth(CreateAuthRequestDTO dto) {
        return rabbitTemplate.convertSendAndReceiveAsType(
            "create.auth.exchange",
            "create.auth.routing.key",
            dto,
            new ParameterizedTypeReference<SagaResponse<CreateAuthResponseDTO>>() {}
        );
    }
}
