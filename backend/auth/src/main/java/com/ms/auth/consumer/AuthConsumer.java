package com.ms.auth.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import com.ms.auth.config.RabbitMQConfig;
import com.ms.auth.dto.create.CreateAuthRequestDTO;
import com.ms.auth.dto.create.CreateAuthResponseDTO;
import com.ms.auth.dto.delete.DeleteAuthRequestDTO;
import com.ms.auth.dto.error.SagaResponse;
import com.ms.auth.dto.update.UpdateAuthDTO;
import com.ms.auth.exception.BusinessException;
import com.ms.auth.service.AuthService;

import jakarta.validation.Valid;

@Component
public class AuthConsumer {

    @Autowired
    private AuthService authService;

    @RabbitListener(queues = RabbitMQConfig.CREATE_AUTH_QUEUE)
    public SagaResponse<CreateAuthResponseDTO> receiveAuthQueue (@Payload @Valid CreateAuthRequestDTO authRequest) {

        if (authService.emailExists(authRequest.getEmail())) {
            return SagaResponse.error("EMAIL_EXISTS", "Email já cadastrado", HttpStatus.CONFLICT.value());
        }

        return SagaResponse.success(authService.createAuth(authRequest));
    }
    
    @RabbitListener(queues = RabbitMQConfig.UPDATE_AUTH_QUEUE)
    public SagaResponse<UpdateAuthDTO> receiveUpdateAuthQueue (@Payload UpdateAuthDTO authRequest) {
        try {
            return SagaResponse.success(authService.updateAuth(authRequest));
        } catch (BusinessException e) {
            return SagaResponse.error(e.getCode(), e.getMessage(), e.getStatus());
        } catch (Exception e) {
            return SagaResponse.error("UPDATE_AUTH_FAILED", "Falha ao atualizar autenticação", HttpStatus.INTERNAL_SERVER_ERROR.value());
        }
    }

    @RabbitListener(queues = RabbitMQConfig.DELETE_AUTH_QUEUE)
    public SagaResponse<Void> receiveDeleteAuthQueue(@Payload DeleteAuthRequestDTO request) {
        try {
            authService.deleteAuth(request);
            return SagaResponse.success(null);
        } catch (BusinessException e) {
            return SagaResponse.error(e.getCode(), e.getMessage(), e.getStatus());
        } catch (Exception e) {
            return SagaResponse.error("DELETE_AUTH_FAILED", "Falha ao deletar autenticação", HttpStatus.INTERNAL_SERVER_ERROR.value());
        }
    }

}
