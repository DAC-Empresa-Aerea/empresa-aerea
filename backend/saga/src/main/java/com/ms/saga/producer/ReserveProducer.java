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

    //Isso sera para atualizar caso o voo tenha mudado estado
    public void updateStatusReserve(FlightStatusDTO dto) {
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.UPDATE_RESERVE_EXCHANGE,
            RabbitMQConfig.UPDATE_RESERVE_ROUTING_KEY,
            dto
        );
    }

}
