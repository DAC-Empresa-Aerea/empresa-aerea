package com.ms.auth.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import com.ms.auth.dto.CreateAuthRequestDTO;
import com.ms.auth.dto.CreateAuthResponseDTO;
import com.ms.auth.dto.error.SagaResponse;
import com.ms.auth.service.AuthService;

import jakarta.validation.Valid;

@Component
public class AuthConsumer {

    @Autowired
    private AuthService authService;

    @RabbitListener(queues = "create.auth.queue")
    public SagaResponse<CreateAuthResponseDTO> receiveAuthQueue (@Payload @Valid CreateAuthRequestDTO authRequest) {

        if (authService.emailExists(authRequest.getEmail())) {
            return SagaResponse.error("EMAIL_EXISTS", "Email já cadastrado");
        }

        return SagaResponse.success(authService.createAuth(authRequest));
    }    
}
