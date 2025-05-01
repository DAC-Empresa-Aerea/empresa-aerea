package com.ms.flight.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ms.flight.config.RabbitMQConfig;
import com.ms.flight.dto.error.SagaResponse;
import com.ms.flight.dto.flight.reserveSeat.UpdateSeatsRequestDTO;
import com.ms.flight.dto.flight.reserveSeat.UpdateSeatsResponseDTO;
import com.ms.flight.dto.flight.reserveSeat.rollback.RollbackReserveSeatsDTO;
import com.ms.flight.service.FlightService;

import jakarta.validation.Valid;

@Component
public class ReserveSeatConsumer {
    
    @Autowired 
    private FlightService flightService;


    @RabbitListener(queues = RabbitMQConfig.RESERVE_SEAT_QUEUE)
    public SagaResponse<UpdateSeatsResponseDTO> receiveReserveSeatUpdate(@Valid UpdateSeatsRequestDTO request) {

        return flightService.reserveSeats(request);
    }

    @RabbitListener(queues = RabbitMQConfig.ROLLBACK_RESERVE_SEAT_QUEUE)
    public void receiveRollbackReserveSeatUpdate(@Valid RollbackReserveSeatsDTO request) {

        flightService.rollbackReserveSeats(request);
    }

}
