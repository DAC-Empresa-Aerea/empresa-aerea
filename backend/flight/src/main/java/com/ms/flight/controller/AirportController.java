package com.ms.flight.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ms.flight.dto.airport.AirportResponseDTO;
import com.ms.flight.service.AirportService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("aeroportos")
public class AirportController {

    @Autowired
    private AirportService airportService;

    @GetMapping()
    public List<AirportResponseDTO> getAirports() {
        
        return airportService.getAllAirports();
    }
    
}
