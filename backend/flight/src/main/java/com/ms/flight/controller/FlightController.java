package com.ms.flight.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ms.flight.dto.flight.FlightResponseDTO;
import com.ms.flight.dto.flight.FlightWithAirportResponseDTO;
import com.ms.flight.dto.flight.register.RegisterFlightRequestDTO;
import com.ms.flight.service.FlightService;

import jakarta.validation.Valid;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/voos")
public class FlightController {

    @Autowired
    private FlightService flightService;
    
    @PostMapping()
    public ResponseEntity<FlightResponseDTO> registerFlight(@RequestBody @Valid RegisterFlightRequestDTO flightRequest) {
        
        return ResponseEntity.ok(flightService.registerFlight(flightRequest));
    }

    @GetMapping("/{codigo}")
    public ResponseEntity<FlightWithAirportResponseDTO> searchFlightByCode(@PathVariable @Valid String id) {

        return ResponseEntity.ok(flightService.searchFlightByCode(id));
    }

    @GetMapping
    public ResponseEntity<?> searchFlights(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data,
            @RequestParam(required = false) String origem,
            @RequestParam(required = false) String destino,
            @RequestParam(name = "data-fim", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFim
    ) {
        if (origem != null && destino != null && dataFim == null) {
            return ResponseEntity.ok(flightService.searchFlightsByAirport(data, origem, destino));
        }
        if (dataFim != null && origem == null && destino == null) {
            return ResponseEntity.ok(flightService.searchFlightsByDate(data, dataFim));
        }
        return ResponseEntity.badRequest().body("Informe origem/destino ou intervalo de datas");
    }
    
}
