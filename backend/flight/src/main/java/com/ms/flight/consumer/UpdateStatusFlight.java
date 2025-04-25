package com.ms.flight.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import com.ms.flight.service.FlightService;

import jakarta.validation.Valid;

import com.ms.flight.config.RabbitMQConfig;
import com.ms.flight.dto.error.SagaResponse;
import com.ms.flight.dto.flight.FlightResponseDTO;
import com.ms.flight.dto.flightStatus.FlightStatusRequestDTO;

@Component
public class UpdateStatusFlight {
    
    @Autowired
    private FlightService flightService;

    @RabbitListener(queues = RabbitMQConfig.UPDATE_FLIGHT_QUEUE)
    public SagaResponse<FlightResponseDTO> receiveUpdateFlightStatus(FlightStatusRequestDTO flightCode) {

        return new SagaResponse<>(
            true,
            flightService.updateFlight(flightCode),
            null
        );
    }

    @RabbitListener(queues = RabbitMQConfig.ROLLBACK_FLIGHT_QUEUE)
    public void receiveRollbackFlight(@Payload @Valid FlightStatusRequestDTO flightCode) {
        flightService.rollbackFlight(flightCode);
    }

}
