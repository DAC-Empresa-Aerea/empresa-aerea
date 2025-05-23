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
        List<AirportResponseDTO> dtos = new ArrayList<>();
    
        List<Airport> airports = airportRepository.findAll();
        for (Airport airport : airports) {
            AirportResponseDTO dto = new AirportResponseDTO();
            BeanUtils.copyProperties(airport, dto);
            dto.setUf(airport.getUF());
            dtos.add(dto);
        }
    
        return dtos;
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
        airport.setUF(airportRequest.getUF() != null ? airportRequest.getUF() : "SP");

        System.out.println("Airport: " + airport.getUF());
        airportRepository.save(airport);

        AirportResponseDTO airportResponse = new AirportResponseDTO();
        BeanUtils.copyProperties(airport, airportResponse, "id");
        airportResponse.setUf(airport.getUF());

        return airportResponse;
    }

}
