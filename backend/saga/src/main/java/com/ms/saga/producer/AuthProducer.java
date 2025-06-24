package com.ms.saga.producer;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;

import com.ms.saga.config.RabbitMQConfig;
import com.ms.saga.dto.auth.create.CreateAuthRequestDTO;
import com.ms.saga.dto.auth.create.CreateAuthResponseDTO;
import com.ms.saga.dto.auth.delete.DeleteAuthRequestDTO;
import com.ms.saga.dto.auth.update.UpdateAuthRequestDTO;
import com.ms.saga.dto.auth.update.UpdateAuthResponseDTO;
import com.ms.saga.dto.error.SagaResponse;

@Component
public class AuthProducer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public SagaResponse<CreateAuthResponseDTO> sendCreateAuth(CreateAuthRequestDTO dto) {
        return rabbitTemplate.convertSendAndReceiveAsType(
            RabbitMQConfig.CREATE_AUTH_EXCHANGE,
            RabbitMQConfig.CREATE_AUTH_ROUTING_KEY,
            dto,
            new ParameterizedTypeReference<SagaResponse<CreateAuthResponseDTO>>() {}
        );
    }

    public SagaResponse<UpdateAuthResponseDTO> sendUpdateAuth(UpdateAuthRequestDTO dto) {
        return rabbitTemplate.convertSendAndReceiveAsType(
            RabbitMQConfig.UPDATE_AUTH_EXCHANGE,
            RabbitMQConfig.UPDATE_AUTH_ROUTING_KEY,
            dto,
            new ParameterizedTypeReference<SagaResponse<UpdateAuthResponseDTO>>() {}
        );
    }

    public void sendDeleteAuth(DeleteAuthRequestDTO dto) {
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.DELETE_AUTH_EXCHANGE,
            RabbitMQConfig.DELETE_AUTH_ROUTING_KEY,
            dto
        );
    }

}
