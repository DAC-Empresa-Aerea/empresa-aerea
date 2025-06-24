package com.ms.flight.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import com.ms.flight.service.FlightService;
import com.ms.flight.util.ValidationUtil;

import jakarta.validation.ConstraintViolationException;

import com.ms.flight.config.RabbitMQConfig;
import com.ms.flight.dto.error.SagaResponse;
import com.ms.flight.dto.flight.FlightResponseDTO;
import com.ms.flight.dto.flightStatus.FlightStatusRequestDTO;
import com.ms.flight.exception.BusinessException;

@Component
public class UpdateStatusFlight {
    
    @Autowired
    private FlightService flightService;

    @RabbitListener(queues = RabbitMQConfig.UPDATE_FLIGHT_STATUS_QUEUE)
    public SagaResponse<FlightResponseDTO> receiveUpdateFlightStatus(FlightStatusRequestDTO flightCode) {
        try {
            return SagaResponse.success(flightService.updateFlightStatus(flightCode));
        } catch (ConstraintViolationException e) {
            String errors = ValidationUtil.extractMessages(e);
            return SagaResponse.error("VALIDATION_ERROR", errors, HttpStatus.BAD_REQUEST.value());
        } catch (BusinessException e) {
            return SagaResponse.error(e.getCode(), e.getMessage(), e.getStatus());
        } catch (Exception e) {
            return SagaResponse.error("INTERNAL_SERVER_ERROR", "Erro interno no servidor.", HttpStatus.INTERNAL_SERVER_ERROR.value());
        }
        
    }

    @RabbitListener(queues = RabbitMQConfig.ROLLBACK_FLIGHT_STATUS_QUEUE)
    public void receiveRollbackFlight(@Payload FlightStatusRequestDTO flightCode) {
        flightService.rollbackFlight(flightCode);
    }

}
