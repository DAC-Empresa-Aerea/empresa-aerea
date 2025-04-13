package com.ms.auth.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import com.ms.auth.dto.CreateAuthRequestDTO;
import com.ms.auth.dto.CreateAuthResponseDTO;
import com.ms.auth.service.AuthService;

import jakarta.validation.Valid;

@Component
public class AuthConsumer {

    @Autowired
    private AuthService authService;

    @RabbitListener(queues = "create.auth.queue")
    public CreateAuthResponseDTO receiveAuthQueue (@Payload @Valid CreateAuthRequestDTO authRequest) {
        return authService.createAuth(authRequest);
    }
    
}
