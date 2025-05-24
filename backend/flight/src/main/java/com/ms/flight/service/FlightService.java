package com.ms.flight.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ms.flight.dto.airport.AirportResponseDTO;
import com.ms.flight.dto.error.SagaResponse;
import com.ms.flight.dto.flight.FlightByAirportDTO;
import com.ms.flight.dto.flight.FlightResponseDTO;
import com.ms.flight.dto.flight.FlightWithAirportResponseDTO;
import com.ms.flight.dto.flight.register.RegisterFlightRequestDTO;
import com.ms.flight.dto.flight.reserveSeat.UpdateSeatsRequestDTO;
import com.ms.flight.dto.flight.reserveSeat.UpdateSeatsResponseDTO;
import com.ms.flight.dto.flight.reserveSeat.rollback.RollbackReserveSeatsDTO;
import com.ms.flight.dto.flightStatus.FlightStatusRequestDTO;
import com.ms.flight.dto.reserve.cancel.ReserveCancelResponseDTO;
import com.ms.flight.enums.FlightStatusEnum;
import com.ms.flight.model.Airport;
import com.ms.flight.model.Flight;
import com.ms.flight.model.FlightStatus;
import com.ms.flight.repository.FlightRepository;
import com.ms.flight.util.FlightCodeGenerator;

import jakarta.validation.Valid;

@Service
public class FlightService {
    
    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private AirportService airportService;

    @Autowired
    private FlightStatusService flightStatusService;

    public FlightResponseDTO registerFlight(RegisterFlightRequestDTO flightRequest) {

        Airport origem = airportService.getAirportByCode(flightRequest.getCodigoAeroportoOrigem());
        Airport destino = airportService.getAirportByCode(flightRequest.getCodigoAeroportoDestino());
        FlightStatus flightStatus = flightStatusService.getFlightStatusByCode(FlightStatusEnum.CONFIRMADO.getCodigo());

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

    public FlightByAirportDTO searchFlightsByAirport(LocalDate data, String origem, String destino) {
        List<Flight> flights = flightRepository.findByAirportAndDate(origem, destino, data.atStartOfDay());

        List<FlightWithAirportResponseDTO> flightResponses = flights.stream()
            .map(flight -> {
                FlightWithAirportResponseDTO flightResponse = new FlightWithAirportResponseDTO();
                flightResponse.setCodigo(flight.getCodigo());
                flightResponse.setData(flight.getData());
                flightResponse.setValorPassagem(flight.getValor());
                flightResponse.setQuantidadePoltronasTotal(flight.getPoltronasTotais());
                flightResponse.setQuantidadePoltronasOcupadas(flight.getPoltronasOcupadas());
                flightResponse.setEstado(flight.getEstado().getCodigo());
                flightResponse.setAeroportoOrigem(new AirportResponseDTO(flight.getOrigem().getCodigo(), flight.getOrigem().getNome(), flight.getOrigem().getCidade(), flight.getOrigem().getUF()));
                flightResponse.setAeroportoDestino(new AirportResponseDTO(flight.getDestino().getCodigo(), flight.getDestino().getNome(), flight.getDestino().getCidade(), flight.getDestino().getUF()));
                return flightResponse;
            })
            .toList();

        FlightByAirportDTO flightByAirportDTO = new FlightByAirportDTO();
        flightByAirportDTO.setOrigem(origem);
        flightByAirportDTO.setDestino(destino);
        flightByAirportDTO.setData(data.atStartOfDay());
        flightByAirportDTO.setVoos(flightResponses);

        return flightByAirportDTO;
    }

    public List<FlightWithAirportResponseDTO> searchFlightsByDate (LocalDate dataInicio, LocalDate dataFim) {
        List<Flight> flights = flightRepository.findAllByDateBetween(dataInicio.atStartOfDay(), dataFim.atStartOfDay());

        return flights.stream()
            .map(flight -> {
                FlightWithAirportResponseDTO flightResponse = new FlightWithAirportResponseDTO();
                flightResponse.setCodigo(flight.getCodigo());
                flightResponse.setData(flight.getData());
                flightResponse.setValorPassagem(flight.getValor());
                flightResponse.setQuantidadePoltronasTotal(flight.getPoltronasTotais());
                flightResponse.setQuantidadePoltronasOcupadas(flight.getPoltronasOcupadas());
                flightResponse.setEstado(flight.getEstado().getCodigo());
                return flightResponse;
            })
            .toList();
    }

    public FlightResponseDTO updateFlight(FlightStatusRequestDTO flightRequest) {
        Flight flight = flightRepository.findById(flightRequest.getFlightCode())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Voo não encontrado."));
        
        FlightStatus flightStatus = flightStatusService.getFlightStatusByCode(flightRequest.getStatusCode());

        if (flightStatus == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Status de voo não encontrado.");
        }

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
        
        FlightStatus flightStatus = flightStatusService.getFlightStatusByCode(FlightStatusEnum.CONFIRMADO.getCodigo());

        if (flightStatus == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Status de voo não encontrado.");
        }

        flight.setEstado(flightStatus);
        flightRepository.save(flight);
    }

    public SagaResponse<UpdateSeatsResponseDTO> reserveSeats(@Valid UpdateSeatsRequestDTO request) {

        Optional<Flight> flightOptional = flightRepository.findById(request.getFlightCode());

        if (flightOptional.isEmpty()) {
            return SagaResponse.error("FLIGHT_NOT_FOUND", "Voo não encontrado.", HttpStatus.NOT_FOUND.value());
        }

        Flight flight = flightOptional.get();

        if (!FlightStatusEnum.CONFIRMADO.getCodigo().equals(flight.getEstado().getCodigo())) {
            return SagaResponse.error(
                "FLIGHT_RESERVE_NOT_ALLOWED",
                "O voo não pode ser reservado.",
                HttpStatus.BAD_REQUEST.value()
            );
        }

        if(flight.getPoltronasOcupadas() + request.getSeatsQuantity() > flight.getPoltronasTotais()) {
            return SagaResponse.error("SEAT_REQUEST_EXCEEDS_AVAILABILITY", "Número de poltronas ocupadas excede o total.", HttpStatus.BAD_REQUEST.value());
        }

        if(flight.getData().isBefore(LocalDateTime.now())) {
            return SagaResponse.error("INVALID_FLIGHT_DATE_PAST", "A data do voo não pode ser anterior a data atual.", HttpStatus.BAD_REQUEST.value());
        }

        flight.setPoltronasOcupadas(flight.getPoltronasOcupadas() + request.getSeatsQuantity());
        flightRepository.save(flight);

        UpdateSeatsResponseDTO response = new UpdateSeatsResponseDTO();
        response.setFlightCode(flight.getCodigo());
        response.setSeatsQuantity(request.getSeatsQuantity());
        response.setOriginAirportCode(flight.getOrigem().getCodigo());
        response.setDestinyAirportCode(flight.getDestino().getCodigo());
        response.setValue(flight.getValor());
        response.setMilesUsed(
        flight.getValor()
            .divide(BigDecimal.valueOf(5), 0, RoundingMode.CEILING)
            .intValue()
        );

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

    public ReserveCancelResponseDTO cancelReserveSeats(@Valid ReserveCancelResponseDTO reserve) {

        Flight flight = flightRepository.findById(reserve.getFlightCode())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Voo não encontrado."));

        flight.setPoltronasOcupadas(flight.getPoltronasOcupadas() - reserve.getSeatsQuantity());
        flightRepository.save(flight);

        return reserve;
    
    }
}
