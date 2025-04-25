package com.ms.saga.producer;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;

import com.ms.saga.config.RabbitMQConfig;
import com.ms.saga.dto.error.SagaResponse;
import com.ms.saga.dto.flight.FlightRequestDTO;
import com.ms.saga.dto.flight.FlightResponseDTO;
import com.ms.saga.dto.flight.FlightStatusRequestDTO;
import com.ms.saga.dto.flight.FlightStatusDTO;

@Component
public class FlightProducer {
    
    @Autowired
    private RabbitTemplate rabbitTemplate;

    public SagaResponse<FlightResponseDTO> sendCreateFlightCommand(FlightRequestDTO flightDTO) {
        return rabbitTemplate.convertSendAndReceiveAsType(
            RabbitMQConfig.CREATE_CUSTOMER_EXCHANGE,
            RabbitMQConfig.CREATE_CUSTOMER_ROUTING_KEY,
            flightDTO,
            new ParameterizedTypeReference<SagaResponse<FlightResponseDTO>>() {}
        );
    }

    public SagaResponse<FlightResponseDTO> sendUpdateFlightCommand(FlightStatusDTO flightDTO) {;
        return rabbitTemplate.convertSendAndReceiveAsType(
            RabbitMQConfig.UPDATE_FLIGHT_EXCHANGE,
            RabbitMQConfig.UPDATE_FLIGHT_ROUTING_KEY,
            flightDTO,
            new ParameterizedTypeReference<SagaResponse<FlightResponseDTO>>() {}
        );
    }
}
