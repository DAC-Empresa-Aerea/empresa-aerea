package com.ms.saga.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ms.saga.dto.reserve.cancel.CancelReserveResponseDTO;
import com.ms.saga.dto.reserve.cancel.ReserveCancelFlightResponse;
import com.ms.saga.dto.reserve.cancel.ReserveCancelResponseDTO;
import com.ms.saga.dto.reserve.reserveFlight.ReserveFlightRequestDTO;
import com.ms.saga.dto.reserve.reserveFlight.ReserveFlightResponseDTO;
import com.ms.saga.orchestrator.ReserveOrchestrator;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/reservas")
public class ReserveController {

    @Autowired
    private ReserveOrchestrator saga;

    @PostMapping()
    public ResponseEntity<ReserveFlightResponseDTO> registerReserve(@RequestBody @Valid ReserveFlightRequestDTO reserveRequest) {
          
        return ResponseEntity.status(HttpStatus.CREATED).body(saga.processRegisterReserve(reserveRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ReserveCancelFlightResponse> cancelReserve(@PathVariable("id") @Valid String reserveId) {
        return ResponseEntity.ok(saga.processCancelReserve(reserveId));
    }
}