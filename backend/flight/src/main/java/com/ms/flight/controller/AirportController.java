package com.ms.flight.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ms.flight.dto.airport.AirportRequestDTO;
import com.ms.flight.dto.airport.AirportResponseDTO;
import com.ms.flight.service.AirportService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("aeroportos")
public class AirportController {

    @Autowired
    private AirportService airportService;

    @GetMapping()
    public List<AirportResponseDTO> getAirports() {
        
        return airportService.getAllAirports();
    }

    @PostMapping()
    public ResponseEntity<AirportResponseDTO> postMethodName(@RequestBody AirportRequestDTO entity) {
        AirportResponseDTO airport = airportService.createAirport(entity);
        
        return ResponseEntity.ok(airport);
    }
    
    
}
