package com.ms.saga.producer;

import java.util.List;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;

import com.ms.saga.config.RabbitMQConfig;
import com.ms.saga.dto.error.SagaResponse;
import com.ms.saga.dto.flight.FlightStatusDTO;
import com.ms.saga.dto.reserve.UpdatedReserveStatusDTO;
import com.ms.saga.dto.reserve.register.RegisterReserveRequestDTO;
import com.ms.saga.dto.reserve.register.RegisterReserveResponseDTO;

@Component
public class ReserveProducer {
    
    @Autowired
    private RabbitTemplate rabbitTemplate;

    public SagaResponse<RegisterReserveResponseDTO> sendCreateReserve(RegisterReserveRequestDTO registerRequest) {
        return rabbitTemplate.convertSendAndReceiveAsType(
            RabbitMQConfig.REGISTER_RESERVE_EXCHANGE,
            RabbitMQConfig.REGISTER_RESERVE_ROUTING_KEY,
            registerRequest,
            new ParameterizedTypeReference<SagaResponse<RegisterReserveResponseDTO>>() {}
        );
    }

    public void sendRollbackRegisterReserve(String reserveCode) {
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.ROLLBACK_REGISTER_RESERVE_EXCHANGE,
            RabbitMQConfig.ROLLBACK_REGISTER_RESERVE_ROUTING_KEY,
            reserveCode
        );
    }

    public SagaResponse<List<UpdatedReserveStatusDTO>> updateStatusReserve(FlightStatusDTO dto) {
        return rabbitTemplate
            .convertSendAndReceiveAsType(
                RabbitMQConfig.RESERVE_STATUS_UPDATE_EXCHANGE,
                RabbitMQConfig.RESERVE_STATUS_UPDATE_ROUTING_KEY,
                dto,
                new ParameterizedTypeReference<SagaResponse<List<UpdatedReserveStatusDTO>>>() {}
            );
    }

    public void sendRollbackReserveStatus(FlightStatusDTO dto) {
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.ROLLBACK_RESERVE_STATUS_UPDATE_EXCHANGE,
            RabbitMQConfig.ROLLBACK_RESERVE_STATUS_UPDATE_ROUTING_KEY,
            dto
        );
    }

}
