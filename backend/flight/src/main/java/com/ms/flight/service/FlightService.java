package com.ms.flight.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ms.flight.dto.airport.AirportResponseDTO;
import com.ms.flight.dto.error.SagaResponse;
import com.ms.flight.dto.flight.FlightByAirportDTO;
import com.ms.flight.dto.flight.FlightResponseDTO;
import com.ms.flight.dto.flight.FlightWithAirportResponseDTO;
import com.ms.flight.dto.flight.FlightsInIntervalTimeDTO;
import com.ms.flight.dto.flight.register.RegisterFlightRequestDTO;
import com.ms.flight.dto.flight.reserveSeat.UpdateSeatsInfoDTO;
import com.ms.flight.dto.flight.reserveSeat.UpdateSeatsRequestDTO;
import com.ms.flight.dto.flight.reserveSeat.UpdateSeatsResponseDTO;
import com.ms.flight.dto.flight.reserveSeat.rollback.RollbackReserveSeatsDTO;
import com.ms.flight.dto.flightStatus.FlightStatusRequestDTO;
import com.ms.flight.dto.reserve.cancel.ReserveCancelFlightResponse;
import com.ms.flight.dto.reserve.cancel.ReserveCancelResponseDTO;
import com.ms.flight.enums.FlightStatusEnum;
import com.ms.flight.exception.BusinessException;
import com.ms.flight.model.Airport;
import com.ms.flight.model.Flight;
import com.ms.flight.model.FlightStatus;
import com.ms.flight.repository.FlightRepository;
import com.ms.flight.util.FlightCodeGenerator;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import jakarta.validation.Validator;

@Service
public class FlightService {
    
    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private AirportService airportService;

    @Autowired
    private FlightStatusService flightStatusService;

    @Autowired
    private Validator validator;

    public FlightResponseDTO registerFlight(RegisterFlightRequestDTO flightRequest) {

        Airport origem = airportService.getAirportByCode(flightRequest.getCodigoAeroportoOrigem());
        Airport destino = airportService.getAirportByCode(flightRequest.getCodigoAeroportoDestino());
        FlightStatus flightStatus = flightStatusService.getFlightStatusByCode(FlightStatusEnum.CONFIRMED.getCodigo());

        if (origem.equals(destino)) {
            throw new IllegalArgumentException("Aeroporto de origem e destino não podem ser iguais.");
        }
    
        if (flightRequest.getQuantidadePoltronasOcupadas() > flightRequest.getQuantidadePoltronasTotal()) {
            throw new IllegalArgumentException("Poltronas ocupadas não podem exceder o total.");
        }

        Flight flight = new Flight();
        flight.setCodigo(FlightCodeGenerator.generateFlightCode());
        flight.setOrigem(origem);
        flight.setDestino(destino);
        flight.setData(flightRequest.getData());
        flight.setValor(flightRequest.getValorPassagem());
        flight.setPoltronasTotais(flightRequest.getQuantidadePoltronasTotal());
        flight.setPoltronasOcupadas(flightRequest.getQuantidadePoltronasOcupadas());
        flight.setEstado(flightStatus);

        flightRepository.save(flight);
        
        FlightResponseDTO flightResponse = new FlightResponseDTO();
        flightResponse.setCodigo(flight.getCodigo());
        flightResponse.setData(flight.getData());
        flightResponse.setValorPassagem(flight.getValor());
        flightResponse.setQuantidadePoltronasTotal(flight.getPoltronasTotais());
        flightResponse.setQuantidadePoltronasOcupadas(flight.getPoltronasOcupadas());
        flightResponse.setCodigoAeroportoOrigem(flight.getOrigem().getCodigo());
        flightResponse.setCodigoAeroportoDestino(flight.getDestino().getCodigo());
        flightResponse.setEstado(flight.getEstado().getCodigo());

        return flightResponse;
    }

    public FlightWithAirportResponseDTO searchFlightByCode(String id) {
        Flight flight = flightRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Voo não encontrado."));
        
        Airport origem = flight.getOrigem();
        Airport destino = flight.getDestino();

        FlightWithAirportResponseDTO flightResponse = new FlightWithAirportResponseDTO();
        flightResponse.setCodigo(flight.getCodigo());
        flightResponse.setData(flight.getData());
        flightResponse.setValorPassagem(flight.getValor());
        flightResponse.setQuantidadePoltronasTotal(flight.getPoltronasTotais());
        flightResponse.setQuantidadePoltronasOcupadas(flight.getPoltronasOcupadas());
        flightResponse.setEstado(flight.getEstado().getCodigo());
        flightResponse.setAeroportoOrigem(new AirportResponseDTO(origem.getCodigo(), origem.getNome(), origem.getCidade(), origem.getUF()));
        flightResponse.setAeroportoDestino(new AirportResponseDTO(destino.getCodigo(), destino.getNome(), destino.getCidade(), destino.getUF()));

        return flightResponse;
    }

    public FlightByAirportDTO searchFlightsByAirport(LocalDate date, String origem, String destino) {
        OffsetDateTime startDate = date.atStartOfDay().atOffset(ZoneOffset.of("-03:00"));

        List<Flight> flights = flightRepository.findByAirportAndDate(
            origem, destino, startDate);

        List<FlightWithAirportResponseDTO> flightResponses = flights.stream()
            .map(flight -> {
                FlightWithAirportResponseDTO dto = new FlightWithAirportResponseDTO();
                dto.setCodigo(flight.getCodigo());
                dto.setData(flight.getData());
                dto.setValorPassagem(flight.getValor());
                dto.setQuantidadePoltronasTotal(flight.getPoltronasTotais());
                dto.setQuantidadePoltronasOcupadas(flight.getPoltronasOcupadas());
                dto.setEstado(flight.getEstado().getCodigo());
                dto.setAeroportoOrigem(new AirportResponseDTO(flight.getOrigem().getCodigo(), flight.getOrigem().getNome(), flight.getOrigem().getCidade(), flight.getOrigem().getUF()));
                dto.setAeroportoDestino(new AirportResponseDTO(flight.getDestino().getCodigo(), flight.getDestino().getNome(), flight.getDestino().getCidade(), flight.getDestino().getUF()));
                return dto;
            })
            .toList();

        FlightByAirportDTO result = new FlightByAirportDTO();
        result.setOrigem(origem);
        result.setDestino(destino);
        result.setData(startDate);
        result.setVoos(flightResponses);

        return result;
    }


    public FlightsInIntervalTimeDTO searchFlightsByDate (LocalDate startDate, LocalDate endDate) {
        OffsetDateTime startDateOffset = startDate.atStartOfDay().atOffset(ZoneOffset.of("-03:00"));
        OffsetDateTime endDateOffset = endDate.atStartOfDay().atOffset(ZoneOffset.of("-03:00"));
        List<Flight> flights = flightRepository.findAllByDateBetween(startDateOffset, endDateOffset);
        
        FlightsInIntervalTimeDTO result = new FlightsInIntervalTimeDTO();
        result.setFlights(
            flights.stream()
                .map(flight -> {
                    FlightWithAirportResponseDTO dto = new FlightWithAirportResponseDTO();
                    dto.setCodigo(flight.getCodigo());
                    dto.setData(flight.getData());
                    dto.setValorPassagem(flight.getValor());
                    dto.setQuantidadePoltronasTotal(flight.getPoltronasTotais());
                    dto.setQuantidadePoltronasOcupadas(flight.getPoltronasOcupadas());
                    dto.setEstado(flight.getEstado().getCodigo());
                    dto.setAeroportoOrigem(new AirportResponseDTO(flight.getOrigem().getCodigo(), flight.getOrigem().getNome(), flight.getOrigem().getCidade(), flight.getOrigem().getUF()));
                    dto.setAeroportoDestino(new AirportResponseDTO(flight.getDestino().getCodigo(), flight.getDestino().getNome(), flight.getDestino().getCidade(), flight.getDestino().getUF()));
                    return dto;
                })
                .toList()
        );
        result.setStartDate(startDate);
        result.setEndDate(endDate);

        return result;
    }

    public FlightResponseDTO updateFlightStatus(FlightStatusRequestDTO statusRequest) {
        Set<ConstraintViolation<FlightStatusRequestDTO>> violations = validator.validate(statusRequest);

        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }

        if (FlightStatusEnum.fromCode(statusRequest.getStatusCode()) == null || FlightStatusEnum.fromCode(statusRequest.getStatusCode()).equals(FlightStatusEnum.CONFIRMED)) {
            throw new BusinessException(
                "INVALID_FLIGHT_STATUS",
                "O status do voo deve ser CANCELADO ou REALIZADO.",
                HttpStatus.BAD_REQUEST.value()
            );
        }

        Flight flight = flightRepository.findById(statusRequest.getFlightCode())
            .orElseThrow(() -> new BusinessException("FLIGHT_NOT_FOUND", "Voo não encontrado.", HttpStatus.NOT_FOUND.value())
        );

        if(!FlightStatusEnum.CONFIRMED.getCodigo().equals(flight.getEstado().getCodigo())) {
            throw new BusinessException("FLIGHT_STATUS_NOT_ALLOWED", "O status do voo não pode ser alterado.", HttpStatus.BAD_REQUEST.value());
        }
        
        FlightStatus flightStatus = flightStatusService.getFlightStatusByCode(statusRequest.getStatusCode());

        flight.setEstado(flightStatus);
        flightRepository.save(flight);

        FlightResponseDTO flightResponse = new FlightResponseDTO();
        flightResponse.setCodigo(flight.getCodigo());
        flightResponse.setData(flight.getData());
        flightResponse.setValorPassagem(flight.getValor());
        flightResponse.setQuantidadePoltronasTotal(flight.getPoltronasTotais());
        flightResponse.setQuantidadePoltronasOcupadas(flight.getPoltronasOcupadas());
        flightResponse.setEstado(flight.getEstado().getCodigo());
        flightResponse.setCodigoAeroportoOrigem(flight.getOrigem().getCodigo());
        flightResponse.setCodigoAeroportoDestino(flight.getDestino().getCodigo());

        return flightResponse;
    }

    public void rollbackFlight(FlightStatusRequestDTO flightRequest) {
        Flight flight = flightRepository.findById(flightRequest.getFlightCode())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Voo não encontrado."));
        
        FlightStatus flightStatus = flightStatusService.getFlightStatusByCode(FlightStatusEnum.CONFIRMED.getCodigo());

        flight.setEstado(flightStatus);
        flightRepository.save(flight);
    }

    public SagaResponse<UpdateSeatsResponseDTO> reserveSeats(@Valid UpdateSeatsRequestDTO request) {

        Optional<Flight> flightOptional = flightRepository.findById(request.getFlightCode());

        if (flightOptional.isEmpty()) {
            return SagaResponse.error("FLIGHT_NOT_FOUND", "Voo não encontrado.", HttpStatus.NOT_FOUND.value());
        }

        Flight flight = flightOptional.get();

        if (!FlightStatusEnum.CONFIRMED.getCodigo().equals(flight.getEstado().getCodigo())) {
            return SagaResponse.error(
                "FLIGHT_RESERVE_NOT_ALLOWED",
                "O voo não pode ser reservado.",
                HttpStatus.BAD_REQUEST.value()
            );
        }

        if(flight.getPoltronasOcupadas() + request.getSeatsQuantity() > flight.getPoltronasTotais()) {
            return SagaResponse.error("SEAT_REQUEST_EXCEEDS_AVAILABILITY", "Número de poltronas ocupadas excede o total.", HttpStatus.BAD_REQUEST.value());
        }

        if(flight.getData().isBefore(OffsetDateTime.now())) {
            return SagaResponse.error("INVALID_FLIGHT_DATE_PAST", "A data do voo não pode ser anterior a data atual.", HttpStatus.BAD_REQUEST.value());
        }

        flight.setPoltronasOcupadas(flight.getPoltronasOcupadas() + request.getSeatsQuantity());
        flightRepository.save(flight);

        

        FlightWithAirportResponseDTO flightWithAirportResponse = new FlightWithAirportResponseDTO();
        flightWithAirportResponse.setCodigo(flight.getCodigo());
        flightWithAirportResponse.setData(flight.getData());
        flightWithAirportResponse.setValorPassagem(flight.getValor());
        flightWithAirportResponse.setQuantidadePoltronasTotal(flight.getPoltronasTotais());
        flightWithAirportResponse.setQuantidadePoltronasOcupadas(flight.getPoltronasOcupadas());
        flightWithAirportResponse.setEstado(flight.getEstado().getCodigo());
        flightWithAirportResponse.setAeroportoOrigem(new AirportResponseDTO(flight.getOrigem().getCodigo(), flight.getOrigem().getNome(), flight.getOrigem().getCidade(), flight.getOrigem().getUF()));
        flightWithAirportResponse.setAeroportoDestino(new AirportResponseDTO(flight.getDestino().getCodigo(), flight.getDestino().getNome(), flight.getDestino().getCidade(), flight.getDestino().getUF()));
        
        UpdateSeatsInfoDTO updateSeatsInfo = new UpdateSeatsInfoDTO();
        updateSeatsInfo.setMilesUsed(
            flight.getValor()
                .divide(BigDecimal.valueOf(5), 0, RoundingMode.CEILING)
                .intValue()
        );
        updateSeatsInfo.setValue(flight.getValor());
        updateSeatsInfo.setSeatsQuantity(request.getSeatsQuantity());
        

        UpdateSeatsResponseDTO response = new UpdateSeatsResponseDTO();
        response.setFlight(flightWithAirportResponse);
        response.setInfo(updateSeatsInfo);

        return SagaResponse.success(response);
    
    }

    public void rollbackReserveSeats(RollbackReserveSeatsDTO reserveSeats) {
        Optional<Flight> flightOptional = flightRepository.findById(reserveSeats.getFlightCode());

        if (flightOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Voo não encontrado.");
        }

        Flight flight = flightOptional.get();

        if(flight.getPoltronasOcupadas() - reserveSeats.getSeatsQuantity() < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Número de poltronas ocupadas não pode ser menor que zero.");
        }

        flight.setPoltronasOcupadas(flight.getPoltronasOcupadas() - reserveSeats.getSeatsQuantity());
        flightRepository.save(flight);
    }

    public ReserveCancelFlightResponse cancelReserveSeats(@Valid ReserveCancelResponseDTO reserve) {

        Flight flight = flightRepository.findById(reserve.getFlightCode())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Voo não encontrado."));

        flight.setPoltronasOcupadas(flight.getPoltronasOcupadas() - reserve.getSeatsQuantity());
        flightRepository.save(flight);

        ReserveCancelFlightResponse reserveWithFlight = new ReserveCancelFlightResponse();
        reserveWithFlight.setCode(reserve.getCode());
        LocalDateTime localReserveDate = reserve.getDate();
        if (localReserveDate != null) {
            reserveWithFlight.setDate(localReserveDate.atOffset(ZoneOffset.UTC));
        }
        reserveWithFlight.setValue(reserve.getValue());
        reserveWithFlight.setMilesUsed(reserve.getMilesUsed());
        reserveWithFlight.setSeatsQuantity(reserve.getSeatsQuantity());
        reserveWithFlight.setCustomerCode(reserve.getCustomerCode());
        reserveWithFlight.setStatus(reserve.getStatus());
        reserveWithFlight.setFlight(new FlightWithAirportResponseDTO(
            flight.getCodigo(),
            flight.getData(),
            flight.getValor(),
            flight.getPoltronasTotais(),
            flight.getPoltronasOcupadas(),
            flight.getEstado().getCodigo(),
            new AirportResponseDTO(flight.getOrigem().getCodigo(), flight.getOrigem().getNome(), flight.getOrigem().getCidade(), flight.getOrigem().getUF()),
            new AirportResponseDTO(flight.getDestino().getCodigo(), flight.getDestino().getNome(), flight.getDestino().getCidade(), flight.getDestino().getUF())
        ));

        return reserveWithFlight;
    
    }
}
