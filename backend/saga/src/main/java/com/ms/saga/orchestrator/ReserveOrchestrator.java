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
        try {
            ReserveCancelRequestDTO buscarDto = new ReserveCancelRequestDTO();
            buscarDto.setReservaId(id);

            SagaResponse<ReserveCancelResponseDTO> getReserveResponse = reserveProducer.sendGetReserve(buscarDto);

            if (getReserveResponse == null) {
                throw new BusinessException("Falha na comunicação com o serviço de reservas", "SERVICE_UNAVAILABLE", 503);
            }

            if (!getReserveResponse.isSuccess()) {
                throw new BusinessException(getReserveResponse.getError());
            }

            SagaResponse<ReserveCancelResponseDTO> cancelResponse = reserveProducer.sendCancelReserve(buscarDto);

            if (!cancelResponse.isSuccess()) {
                throw new BusinessException(cancelResponse.getError());
            }

            SagaResponse<ReserveCancelResponseDTO> cancelResponseMiles = reserveProducer.returnsMilesToCustomer(cancelResponse.getData());

            if (!cancelResponseMiles.isSuccess()) {
                throw new BusinessException(cancelResponseMiles.getError());
            }

            SagaResponse<ReserveCancelFlightResponse> cancelResponseSeats = reserveProducer.returnsSeatsToFlight(cancelResponse.getData());

            if (!cancelResponseSeats.isSuccess()) {
                throw new BusinessException(cancelResponseSeats.getError());
            }

            return cancelResponseSeats.getData();
            } catch (BusinessException e) {
                throw e;
            } catch (Exception e) {
                throw new BusinessException(
                    "Erro ao processar cancelamento: " + e.getMessage(),
                    "CANCEL_PROCESSING_ERROR",
                    500
                );
            }
    }

    // Update status reserve because the flight status changed
    public void updateStatusReserve(FlightStatusDTO dto) {
        reserveProducer.updateStatusReserve(dto);
    }

}
