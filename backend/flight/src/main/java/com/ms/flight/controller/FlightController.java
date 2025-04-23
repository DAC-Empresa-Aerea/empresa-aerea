package com.ms.flight.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ms.flight.dto.flight.FlightResponseDTO;
import com.ms.flight.dto.flight.register.RegisterFlightRequestDTO;
import com.ms.flight.service.FlightService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("voos")
public class FlightController {

    @Autowired
    private FlightService flightService;
    
    @PostMapping()
    public ResponseEntity<FlightResponseDTO> registerFlight(@RequestBody @Valid RegisterFlightRequestDTO flightRequest) {
        
        return ResponseEntity.ok(flightService.registerFlight(flightRequest));
    }
    
}
