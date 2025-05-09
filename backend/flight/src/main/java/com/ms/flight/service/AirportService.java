package com.ms.flight.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ms.flight.dto.airport.AirportRequestDTO;
import com.ms.flight.dto.airport.AirportResponseDTO;
import com.ms.flight.exception.AirportNotRegisteredException;
import com.ms.flight.model.Airport;
import com.ms.flight.repository.AirportRepository;

@Service
public class AirportService {

    @Autowired
    private AirportRepository airportRepository;

    public List<AirportResponseDTO> getAllAirports() {
        List<AirportResponseDTO> airportResponseDTOs = new ArrayList<>();

        List<Airport> airports = airportRepository.findAll();
        BeanUtils.copyProperties(airports, airportResponseDTOs, "id");

        return airportResponseDTOs;
    }
    
    public Airport getAirportByCode(String airportCode) {
        return airportRepository.findById(airportCode).
            orElseThrow(() -> new AirportNotRegisteredException("Aeroporto não encontrado"));
    }

    public AirportResponseDTO createAirport(AirportRequestDTO airportRequest) {
        Airport airport = new Airport();
        airport.setCodigo(airportRequest.getCodigo());
        airport.setNome(airportRequest.getNome());
        airport.setCidade(airportRequest.getCidade());
        airport.setUF(airportRequest.getUF());

        airportRepository.save(airport);

        AirportResponseDTO airportResponse = new AirportResponseDTO();
        BeanUtils.copyProperties(airport, airportResponse, "id");

        return airportResponse;
    }

}
