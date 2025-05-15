package com.ms.saga.producer;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;

import com.ms.saga.config.RabbitMQConfig;
import com.ms.saga.dto.error.SagaResponse;
import com.ms.saga.dto.flight.FlightStatusDTO;
import com.ms.saga.dto.reserve.register.RegisterReserveRequestDTO;
import com.ms.saga.dto.reserve.register.RegisterReserveResponseDTO;
import com.ms.saga.dto.reserve.cancel.CancelReserveResponseDTO;

@Component
public class ReserveProducer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public SagaResponse<RegisterReserveResponseDTO> sendCreateReserve(RegisterReserveRequestDTO registerRequest) {
        return rabbitTemplate.convertSendAndReceiveAsType(
                RabbitMQConfig.REGISTER_RESERVE_EXCHANGE,
                RabbitMQConfig.REGISTER_RESERVE_ROUTING_KEY,
                registerRequest,
                new ParameterizedTypeReference<SagaResponse<RegisterReserveResponseDTO>>() {
                });
    }

    public void sendRollbackRegisterReserve(String reserveCode) {
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.ROLLBACK_REGISTER_RESERVE_EXCHANGE,
                RabbitMQConfig.ROLLBACK_REGISTER_RESERVE_ROUTING_KEY,
                reserveCode);
    }

    public SagaResponse<Void> updateStatusReserve(FlightStatusDTO dto) {
        Object reply = rabbitTemplate
                .convertSendAndReceive(
                        RabbitMQConfig.UPDATE_RESERVE_EXCHANGE,
                        RabbitMQConfig.UPDATE_RESERVE_ROUTING_KEY,
                        dto);
        return (SagaResponse<Void>) reply;
    }

    public SagaResponse<RegisterReserveResponseDTO> sendGetReserve(String reserveCode) {
    return rabbitTemplate.convertSendAndReceiveAsType(
        RabbitMQConfig.GET_RESERVE_EXCHANGE,          
        RabbitMQConfig.GET_RESERVE_ROUTING_KEY,       
        reserveCode,                                  
        new ParameterizedTypeReference<SagaResponse<RegisterReserveResponseDTO>>() {}
    );
    }

    public SagaResponse<RegisterReserveResponseDTO> sendCanecelReserve(CancelReserveResponseDTO cancelRequest) {
        return rabbitTemplate.convertSendAndReceiveAsType(
                RabbitMQConfig.CANCEL_RESERVE_EXCHANGE,
                RabbitMQConfig.CANCEL_RESERVE_ROUTING_KEY,
            cancelRequest,
            new ParameterizedTypeReference<SagaResponse<RegisterReserveResponseDTO>>() {}
        );
    }

    public void sendRollbackCancelReserve(String reserveCode) {
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.CANCEL_RESERVE_EXCHANGE,
                RabbitMQConfig.CANCEL_RESERVE_ROUTING_KEY,
            reserveCode
        );
    }

    public SagaResponse<Void> updateStatusReserveCancel(CancelReserveResponseDTO dto) {
        Object reply = rabbitTemplate
            .convertSendAndReceive(
                RabbitMQConfig.CANCEL_RESERVE_EXCHANGE,
                RabbitMQConfig.CANCEL_RESERVE_ROUTING_KEY,
                dto
            );
        return (SagaResponse<Void>) reply;
    }
}

