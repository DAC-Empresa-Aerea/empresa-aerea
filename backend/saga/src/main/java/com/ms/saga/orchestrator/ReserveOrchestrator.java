package com.ms.saga.orchestrator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import com.ms.saga.dto.customer.GetMilesRequestDTO;
import com.ms.saga.dto.customer.GetMilesResponseDTO;
import com.ms.saga.dto.customer.debitSeat.DebitSeatRequestDTO;
import com.ms.saga.dto.customer.debitSeat.DebitSeatResponseDTO;
import com.ms.saga.dto.error.SagaResponse;
import com.ms.saga.dto.flight.FlightStatusDTO;
import com.ms.saga.dto.flight.updateSeats.UpdateSeatsRequestDTO;
import com.ms.saga.dto.flight.updateSeats.UpdateSeatsResponseDTO;
import com.ms.saga.dto.flight.updateSeats.rollback.RollbackReserveSeatsDTO;
import com.ms.saga.dto.reserve.cancel.ReserveCancelFlightResponse;
import com.ms.saga.dto.reserve.cancel.ReserveCancelRequestDTO;
import com.ms.saga.dto.reserve.cancel.ReserveCancelResponseDTO;
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
        SagaResponse<GetMilesResponseDTO> customerResponse = customerProducer.sendGetMiles(new GetMilesRequestDTO(reserveRequest.getCustomerCode()));
        
        if(!customerResponse.isSuccess()) {
            throw new BusinessException(customerResponse.getError());
        }

        if(customerResponse.getData().getMilesBalance() < reserveRequest.getMilesUsed()) {
            throw new BusinessException("MILES_INSUFFICIENT", "Saldo de milhas insuficiente", HttpStatus.BAD_REQUEST.value());
        }

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
            reserveRequest.getValue(),
            reserveRequest.getMilesUsed(),
            reserveRequest.getFlightCode(),
            seatsResponse.getData().getInfo().getSeatsQuantity()
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
            reserveRequest.getMilesUsed(),
            reserveRequest.getValue(),
            seatsResponse.getData().getInfo().getSeatsQuantity(),
            seatsResponse.getData().getFlight().getOriginAirport().getCode(),
            seatsResponse.getData().getFlight().getDestinyAirport().getCode()
        );

        SagaResponse<DebitSeatResponseDTO> debitSeatResponseDTO = customerProducer.sendSeatDebit(seatDebit);

        if(!debitSeatResponseDTO.isSuccess()) {

            RollbackReserveSeatsDTO rollbackReserveSeatsDTO = new RollbackReserveSeatsDTO(
                seatsRequest.getFlightCode(), 
                seatsRequest.getSeatsQuantity()
            );
            flightProducer.sendRollbackReserveSeats(rollbackReserveSeatsDTO);

            reserveProducer.sendRollbackRegisterReserve(registerReserveResponse.getData());

            throw new BusinessException(debitSeatResponseDTO.getError());
        }

        ReserveFlightResponseDTO reserveFlightResponseDTO = new ReserveFlightResponseDTO();
        reserveFlightResponseDTO.setCode(debitSeatResponseDTO.getData().getReserveCode());
        reserveFlightResponseDTO.setCustomerCode(debitSeatResponseDTO.getData().getCustomerCode());
        reserveFlightResponseDTO.setDate(registerReserveResponse.getData().getDate());
        reserveFlightResponseDTO.setValue(reserveRequest.getValue());
        reserveFlightResponseDTO.setMilesUsed(reserveRequest.getMilesUsed());
        reserveFlightResponseDTO.setStatus(registerReserveResponse.getData().getStatus());
        reserveFlightResponseDTO.setSeatsQuantity(debitSeatResponseDTO.getData().getSeatsQuantity());
        reserveFlightResponseDTO.setFlight(seatsResponse.getData().getFlight());
        
        return reserveFlightResponseDTO;
    }

public ReserveCancelFlightResponse processCancelReserve(String id) {
        ReserveCancelRequestDTO getReserveRequest = new ReserveCancelRequestDTO();
        getReserveRequest.setReservaId(id);

        SagaResponse<ReserveCancelResponseDTO> getReserveResponse;
        try {
            getReserveResponse = reserveProducer.sendGetReserve(getReserveRequest);
            if (getReserveResponse == null) {
                throw new BusinessException("Falha na comunicação inicial com o serviço de reservas ao buscar reserva.", "GET_RESERVE_COMM_ERROR", 503);
            }
            if (!getReserveResponse.isSuccess()) {
                throw new BusinessException(getReserveResponse.getError());
            }
        } catch (Exception e) {
            if (e instanceof BusinessException) throw (BusinessException) e;
            throw new BusinessException("Erro ao buscar detalhes da reserva para cancelamento: " + e.getMessage(), "GET_RESERVE_ERROR", 500);
        }
        
        ReserveCancelResponseDTO reserveToCancelDetails = getReserveResponse.getData();

        SagaResponse<ReserveCancelResponseDTO> cancelReserveStatusResponse;
        try {
            cancelReserveStatusResponse = reserveProducer.sendCancelReserve(getReserveRequest); 
            if (!cancelReserveStatusResponse.isSuccess()) {
                throw new BusinessException(cancelReserveStatusResponse.getError());
            }
        } catch (Exception e) {
            if (e instanceof BusinessException) throw (BusinessException) e;
            throw new BusinessException("Erro ao solicitar cancelamento da reserva: " + e.getMessage(), "CANCEL_RESERVE_ERROR", 500);
        }
        
        SagaResponse<ReserveCancelResponseDTO> returnMilesResponse;
        try {
            returnMilesResponse = reserveProducer.returnsMilesToCustomer(reserveToCancelDetails);
            if (!returnMilesResponse.isSuccess()) {
                reserveProducer.sendRollbackCancelReserve(getReserveRequest); 
                throw new BusinessException(returnMilesResponse.getError());
            }
        } catch (Exception e) {
            reserveProducer.sendRollbackCancelReserve(getReserveRequest);
            if (e instanceof BusinessException) throw (BusinessException) e;
            throw new BusinessException("Erro ao solicitar devolução de milhas: " + e.getMessage(), "RETURN_MILES_ERROR", 500);
        }

        SagaResponse<ReserveCancelFlightResponse> returnSeatsResponse;
        try {
            returnSeatsResponse = reserveProducer.returnsSeatsToFlight(reserveToCancelDetails); 
            if (!returnSeatsResponse.isSuccess()) {
                reserveProducer.sendRollbackCancelReserveMiles(reserveToCancelDetails); 
                reserveProducer.sendRollbackCancelReserve(getReserveRequest); 
                throw new BusinessException(returnSeatsResponse.getError());
            }
        } catch (Exception e) {
            reserveProducer.sendRollbackCancelReserveMiles(reserveToCancelDetails);
            reserveProducer.sendRollbackCancelReserve(getReserveRequest);
            if (e instanceof BusinessException) throw (BusinessException) e;
            throw new BusinessException("Erro ao solicitar devolução de assentos: " + e.getMessage(), "RETURN_SEATS_ERROR", 500);
        }

        return returnSeatsResponse.getData();
    }

    // Update status reserve because the flight status changed
    public void updateStatusReserve(FlightStatusDTO dto) {
        reserveProducer.updateStatusReserve(dto);
    }

}
