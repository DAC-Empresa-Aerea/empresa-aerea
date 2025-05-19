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
import com.ms.auth.dto.update.UpdateAuthRequestDTO;
import com.ms.auth.dto.update.UpdateAuthResponseDTO;
import com.ms.auth.exception.BusinessException;
import com.ms.auth.service.AuthService;
import com.ms.auth.util.ValidationUtil;

import jakarta.validation.ConstraintViolationException;

@Component
public class AuthConsumer {

    @Autowired
    private AuthService authService;

    @RabbitListener(queues = RabbitMQConfig.CREATE_AUTH_QUEUE)
    public SagaResponse<CreateAuthResponseDTO> receiveAuthQueue (@Payload CreateAuthRequestDTO authRequest) {
        try {
            return SagaResponse.success(authService.createAuth(authRequest));
        } catch (ConstraintViolationException e) {
            String errors = ValidationUtil.extractMessages(e);
            return SagaResponse.error("VALIDATION_ERROR", errors, HttpStatus.BAD_REQUEST.value());
        } catch (BusinessException e) {
            return SagaResponse.error(e.getCode(), e.getMessage(), e.getStatus());
        } catch (Exception e) {
            return SagaResponse.error("CREATE_AUTH_FAILED", "Falha ao criar autenticação", HttpStatus.INTERNAL_SERVER_ERROR.value());
        }
    }
    
    @RabbitListener(queues = RabbitMQConfig.UPDATE_AUTH_QUEUE)
    public SagaResponse<UpdateAuthResponseDTO> receiveUpdateAuthQueue (@Payload UpdateAuthRequestDTO authRequest) {
        try {
            return SagaResponse.success(authService.updateAuth(authRequest));
        } catch (ConstraintViolationException e) {
            String errors = ValidationUtil.extractMessages(e);
            return SagaResponse.error("VALIDATION_ERROR", errors, HttpStatus.BAD_REQUEST.value());
        } catch (BusinessException e) {
            return SagaResponse.error(e.getCode(), e.getMessage(), e.getStatus());
        } catch (Exception e) {
            return SagaResponse.error("UPDATE_AUTH_FAILED", "Falha ao atualizar autenticação", HttpStatus.INTERNAL_SERVER_ERROR.value());
        }
    }

    @RabbitListener(queues = RabbitMQConfig.DELETE_AUTH_QUEUE)
    public void receiveDeleteAuthQueue(@Payload DeleteAuthRequestDTO request) {
        authService.deleteAuth(request);
    }

}
