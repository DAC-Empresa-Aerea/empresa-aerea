package com.ms.saga.orchestrator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ms.saga.dto.customer.debitSeat.DebitSeatRequestDTO;
import com.ms.saga.dto.customer.debitSeat.DebitSeatResponseDTO;
import com.ms.saga.dto.error.SagaResponse;
import com.ms.saga.dto.flight.FlightStatusDTO;
import com.ms.saga.dto.flight.updateSeats.UpdateSeatsRequestDTO;
import com.ms.saga.dto.flight.updateSeats.UpdateSeatsResponseDTO;
import com.ms.saga.dto.flight.updateSeats.rollback.RollbackReserveSeatsDTO;
import com.ms.saga.dto.reserve.cancel.CancelReserveResponseDTO;
import com.ms.saga.dto.reserve.register.RegisterReserveRequestDTO;
import com.ms.saga.dto.reserve.register.RegisterReserveResponseDTO;
import com.ms.saga.dto.reserve.reserveFlight.ReserveFlightRequestDTO;
import com.ms.saga.dto.reserve.reserveFlight.ReserveFlightResponseDTO;
import com.ms.saga.exception.BusinessException;
import com.ms.saga.producer.CustomerProducer;
import com.ms.saga.producer.FlightProducer;
import com.ms.saga.producer.ReserveProducer;

@Component
public class ReserveOrchestrator {

    @Autowired 
    private ReserveProducer reserveProducer;

    @Autowired
    private FlightProducer flightProducer;

    @Autowired
    private CustomerProducer customerProducer;

    public ReserveFlightResponseDTO processRegisterReserve(ReserveFlightRequestDTO reserveRequest) {
        // Validacao do voo e atualizacao de poltronas
        UpdateSeatsRequestDTO seatsRequest = new UpdateSeatsRequestDTO(
            reserveRequest.getFlightCode(), 
            reserveRequest.getSeatsQuantity(), 
            reserveRequest.getOriginAirportCode(), 
            reserveRequest.getDestinyAirportCode(), 
            reserveRequest.getValue(), 
            reserveRequest.getMilesUsed()
        );

        SagaResponse<UpdateSeatsResponseDTO> seatsResponse = flightProducer.sendReserveSeats(seatsRequest);

        if(!seatsResponse.isSuccess()) {
            throw new BusinessException(seatsResponse.getError());
        }
        // Criação de uma reserva (precisa do código)
        RegisterReserveRequestDTO registerReserveRequestDTO = new RegisterReserveRequestDTO(
            reserveRequest.getCustomerCode(),
            seatsResponse.getData().getValue(),
            seatsResponse.getData().getMilesUsed(),
            reserveRequest.getFlightCode(),
            seatsResponse.getData().getSeatsQuantity()
        );

        SagaResponse<RegisterReserveResponseDTO> registerReserveResponse = reserveProducer.sendCreateReserve(registerReserveRequestDTO);

        if(!registerReserveResponse.isSuccess()) {
            RollbackReserveSeatsDTO rollbackReserveSeatsDTO = new RollbackReserveSeatsDTO(
                seatsRequest.getFlightCode(), 
                seatsRequest.getSeatsQuantity()
            );
            flightProducer.sendRollbackReserveSeats(rollbackReserveSeatsDTO);

            throw new BusinessException(registerReserveResponse.getError());
        }

        // Validacao e debito de milhas do cliente  
        DebitSeatRequestDTO seatDebit = new DebitSeatRequestDTO(
            reserveRequest.getCustomerCode(), 
            registerReserveResponse.getData().getReserveCode(),
            seatsResponse.getData().getMilesUsed(),
            seatsResponse.getData().getValue(),
            seatsResponse.getData().getSeatsQuantity(),
            seatsResponse.getData().getOriginAirportCode(),
            seatsResponse.getData().getDestinyAirportCode()
        );

        SagaResponse<DebitSeatResponseDTO> debitSeatResponseDTO = customerProducer.sendSeatDebit(seatDebit);

        if(!debitSeatResponseDTO.isSuccess()) {
            RollbackReserveSeatsDTO rollbackReserveSeatsDTO = new RollbackReserveSeatsDTO(
                seatsRequest.getFlightCode(), 
                seatsRequest.getSeatsQuantity()
            );
            flightProducer.sendRollbackReserveSeats(rollbackReserveSeatsDTO);

            reserveProducer.sendRollbackRegisterReserve(registerReserveResponse.getData().getReserveCode());

            throw new BusinessException(debitSeatResponseDTO.getError());
        }

        ReserveFlightResponseDTO reserveFlightResponseDTO = new ReserveFlightResponseDTO();
        reserveFlightResponseDTO.setCode(debitSeatResponseDTO.getData().getReserveCode());
        reserveFlightResponseDTO.setCustomerCode(debitSeatResponseDTO.getData().getCustomerCode());
        reserveFlightResponseDTO.setDate(registerReserveResponse.getData().getDate());
        reserveFlightResponseDTO.setValue(debitSeatResponseDTO.getData().getValue());
        reserveFlightResponseDTO.setMilesUsed(debitSeatResponseDTO.getData().getMilesUsed());
        reserveFlightResponseDTO.setStatus(registerReserveResponse.getData().getStatus());
        reserveFlightResponseDTO.setSeatsQuantity(debitSeatResponseDTO.getData().getSeatsQuantity());
        reserveFlightResponseDTO.setOriginAirportCode(debitSeatResponseDTO.getData().getOriginAirportCode());
        reserveFlightResponseDTO.setDestinyAirportCode(debitSeatResponseDTO.getData().getDestinyAirportCode());
        reserveFlightResponseDTO.setFlightCode(seatsResponse.getData().getFlightCode());
        
        return reserveFlightResponseDTO;
    }

    public CancelReserveResponseDTO processCancelReserve(String id) {
        // Validar existencia de reserva e se pode ser cancelada (estado = criada, checkin)
            // Se erro, retorna 404
        // Cancelar a reserva
        // Retornar valor da reserva
            // Se erro, rollback
        // Atualiza poltronas do voo
            // Se erro, rollback
        // Retorna valor

        // Lembrar de usar o ErrorDTO e SagaResponse
        
        return new CancelReserveResponseDTO();
    }

    //Update status reserve because the flight status changed
    public void updateStatusReserve(FlightStatusDTO dto) {
        reserveProducer.updateStatusReserve(dto);
    }
    
}
