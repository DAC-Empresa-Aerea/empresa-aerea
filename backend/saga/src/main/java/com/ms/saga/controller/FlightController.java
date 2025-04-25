package com.ms.saga.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ms.saga.dto.flight.FlightResponseDTO;
import com.ms.saga.dto.flight.FlightStatusRequestDTO;
import com.ms.saga.orchestrator.FlightOrchestrator;

import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/voos")
public class FlightController {
    
    @Autowired
    private FlightOrchestrator saga;

    @PatchMapping("/{id}/estado")
    public ResponseEntity<FlightResponseDTO> changeStatusFlight(@PathVariable String id, @RequestBody FlightStatusRequestDTO entity) {

        return ResponseEntity.ok(saga.processPatchStatusFlight(id, entity));
    }
    

}
