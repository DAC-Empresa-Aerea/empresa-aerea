package com.ms.saga.producer;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;

import com.ms.saga.config.RabbitMQConfig;
import com.ms.saga.dto.error.SagaResponse;
import com.ms.saga.dto.flight.updateSeats.UpdateSeatsRequestDTO;
import com.ms.saga.dto.flight.updateSeats.UpdateSeatsResponseDTO;
import com.ms.saga.dto.flight.updateSeats.rollback.RollbackReserveSeatsDTO;
import com.ms.saga.dto.flight.FlightResponseDTO;
import com.ms.saga.dto.flight.FlightStatusDTO;

@Component
public class FlightProducer {
    
    @Autowired
    private RabbitTemplate rabbitTemplate;

    public SagaResponse<UpdateSeatsResponseDTO> sendReserveSeats(UpdateSeatsRequestDTO request) {

        return rabbitTemplate.convertSendAndReceiveAsType(
            RabbitMQConfig.RESERVE_SEAT_EXCHANGE,
            RabbitMQConfig.RESERVE_SEAT_ROUTING_KEY,
            request,
            new ParameterizedTypeReference<SagaResponse<UpdateSeatsResponseDTO>>() {}
        );
    }

    public void sendRollbackReserveSeats(RollbackReserveSeatsDTO dto) {
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.ROLLBACK_RESERVE_SEAT_EXCHANGE,
            RabbitMQConfig.ROLLBACK_RESERVE_SEAT_ROUTING_KEY,
            dto
        );
    }

    public SagaResponse<FlightResponseDTO> sendUpdateFlightStatus(FlightStatusDTO flightDTO) {;
        return rabbitTemplate.convertSendAndReceiveAsType(
            RabbitMQConfig.UPDATE_FLIGHT_STATUS_EXCHANGE,
            RabbitMQConfig.UPDATE_FLIGHT_STATUS_ROUTING_KEY,
            flightDTO,
            new ParameterizedTypeReference<SagaResponse<FlightResponseDTO>>() {}
        );
    }

    public void sendRollbackFlightStatus(FlightStatusDTO dto) {
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.ROLLBACK_FLIGHT_STATUS_EXCHANGE,
            RabbitMQConfig.ROLLBACK_FLIGHT_STATUS_ROUTING_KEY,
            dto
        );
    }

}
