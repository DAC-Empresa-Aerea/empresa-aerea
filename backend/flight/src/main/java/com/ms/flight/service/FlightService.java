package com.ms.flight.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ms.flight.dto.airport.AirportResponseDTO;
import com.ms.flight.dto.flight.FlightByAirportDTO;
import com.ms.flight.dto.flight.FlightResponseDTO;
import com.ms.flight.dto.flight.FlightWithAirportResponseDTO;
import com.ms.flight.dto.flight.register.RegisterFlightRequestDTO;
import com.ms.flight.enums.FlightStatusEnum;
import com.ms.flight.model.Airport;
import com.ms.flight.model.Flight;
import com.ms.flight.model.FlightStatus;
import com.ms.flight.repository.FlightRepository;
import com.ms.flight.util.FlightCodeGenerator;

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
        flightResponse.setEstado(flight.getEstado().getDescricao());

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
        flightResponse.setEstado(flight.getEstado().getDescricao());
        flightResponse.setAeroportoOrigem(new AirportResponseDTO(origem.getCodigo(), origem.getNome(), origem.getCidade(), origem.getUF()));
        flightResponse.setAeroportoDestino(new AirportResponseDTO(destino.getCodigo(), destino.getNome(), destino.getCidade(), destino.getUF()));

        return new FlightWithAirportResponseDTO();
    }

    public FlightByAirportDTO searchFlightsByAirport(LocalDateTime data, String origem, String destino) {
        List<Flight> flights = flightRepository.findByAirportAndDate(origem, destino, data);

        List<FlightWithAirportResponseDTO> flightResponses = flights.stream()
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

        FlightByAirportDTO flightByAirportDTO = new FlightByAirportDTO();
        flightByAirportDTO.setOrigem(origem);
        flightByAirportDTO.setDestino(destino);
        flightByAirportDTO.setData(data);
        flightByAirportDTO.setVoos(flightResponses);

        return flightByAirportDTO;
    }
}
