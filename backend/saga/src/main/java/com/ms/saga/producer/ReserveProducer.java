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
import com.ms.saga.dto.reserve.cancel.ReserveCancelFlightResponse;
import com.ms.saga.dto.reserve.cancel.ReserveCancelRequestDTO;
import com.ms.saga.dto.reserve.cancel.ReserveCancelResponseDTO;

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

    public void sendRollbackRegisterReserve(RegisterReserveResponseDTO reserve) {
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.ROLLBACK_REGISTER_RESERVE_EXCHANGE,
                RabbitMQConfig.ROLLBACK_REGISTER_RESERVE_ROUTING_KEY,
                reserve);
    }

    public SagaResponse<List<UpdatedReserveStatusDTO>> updateStatusReserve(FlightStatusDTO dto) {
        return rabbitTemplate
                .convertSendAndReceiveAsType(
                        RabbitMQConfig.RESERVE_STATUS_UPDATE_EXCHANGE,
                        RabbitMQConfig.RESERVE_STATUS_UPDATE_ROUTING_KEY,
                        dto,    new ParameterizedTypeReference<SagaResponse<List<UpdatedReserveStatusDTO>>>() {}
            );
    }

    public void sendRollbackReserveStatus(FlightStatusDTO dto) {
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.ROLLBACK_RESERVE_STATUS_UPDATE_EXCHANGE,
            RabbitMQConfig.ROLLBACK_RESERVE_STATUS_UPDATE_ROUTING_KEY,
            dto
        );
    }

    public SagaResponse<ReserveCancelResponseDTO> sendGetReserve(ReserveCancelRequestDTO dto) {
        return rabbitTemplate.convertSendAndReceiveAsType(
            RabbitMQConfig.GET_RESERVE_EXCHANGE,          
            RabbitMQConfig.GET_RESERVE_ROUTING_KEY,       
            dto,                                  
            new ParameterizedTypeReference<SagaResponse<ReserveCancelResponseDTO>>() {}
        );
    }

    public SagaResponse<ReserveCancelResponseDTO> sendCancelReserve(ReserveCancelRequestDTO cancelRequest) {
        try {
            return rabbitTemplate.convertSendAndReceiveAsType(
                RabbitMQConfig.CANCEL_RESERVE_EXCHANGE,
                RabbitMQConfig.CANCEL_RESERVE_ROUTING_KEY,
                cancelRequest,
                new ParameterizedTypeReference<SagaResponse<ReserveCancelResponseDTO>>() {}
            );
        } catch (Exception e) {
            return SagaResponse.error(
                "Erro na comunicação com o serviço de reservas",
                "SERVICE_COMMUNICATION_ERROR",
                503
            );
        }
    }

    public void sendRollbackCancelReserve(ReserveCancelRequestDTO payload) {
        System.out.println("MOCK: Enviando rollback para cancelamento de reserva: " + payload.getReservaId());
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.ROLLBACK_CANCEL_RESERVE_EXCHANGE,
                RabbitMQConfig.ROLLBACK_CANCEL_RESERVE_ROUTING_KEY,
                payload);
    }

    public SagaResponse<ReserveCancelResponseDTO> returnsMilesToCustomer(ReserveCancelResponseDTO cancelRequest) {
        try {
            return rabbitTemplate.convertSendAndReceiveAsType(
                RabbitMQConfig.CANCEL_RESERVE_MILES_EXCHANGE,
                RabbitMQConfig.CANCEL_RESERVE_MILES_ROUTING_KEY,
                cancelRequest,
                new ParameterizedTypeReference<SagaResponse<ReserveCancelResponseDTO>>() {}
            );
        } catch (Exception e) {
            return SagaResponse.error(
                "Erro na comunicação com o serviço de customer",
                "SERVICE_COMMUNICATION_ERROR",
                503
            );
        }
    }

    public void sendRollbackCancelReserveMiles(ReserveCancelResponseDTO payload) {
        System.out.println("MOCK: Enviando rollback para devolução de milhas da reserva: " + payload.getCode());
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.ROLLBACK_CANCEL_RESERVE_MILES_EXCHANGE,
                RabbitMQConfig.ROLLBACK_CANCEL_RESERVE_MILES_ROUTING_KEY,
                payload);
    }

    public SagaResponse<ReserveCancelFlightResponse> returnsSeatsToFlight(ReserveCancelResponseDTO cancelRequest) {
        try {
            return rabbitTemplate.convertSendAndReceiveAsType(
                RabbitMQConfig.CANCEL_RESERVE_SEAT_EXCHANGE,
                RabbitMQConfig.CANCEL_RESERVE_SEAT_ROUTING_KEY,
                cancelRequest,
                new ParameterizedTypeReference<SagaResponse<ReserveCancelFlightResponse>>() {}
            );
        } catch (Exception e) {
            return SagaResponse.error(
                "Erro na comunicação com o serviço de voos",
                "SERVICE_COMMUNICATION_ERROR",
                503
            );
        }
    }

    public void sendRollbackCancelReserveSeat(ReserveCancelResponseDTO payload) {
        System.out.println("MOCK: Enviando rollback para devolução de assentos da reserva: " + payload.getCode() + " para voo: " + payload.getFlightCode());
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.ROLLBACK_CANCEL_RESERVE_SEAT_EXCHANGE,
                RabbitMQConfig.ROLLBACK_CANCEL_RESERVE_SEAT_ROUTING_KEY,
                payload);
    }
}

