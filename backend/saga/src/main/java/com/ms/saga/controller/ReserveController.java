package com.ms.saga.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ms.saga.dto.reserve.cancel.CancelReserveResponseDTO;
import com.ms.saga.dto.reserve.register.RegisterReserveRequestDTO;
import com.ms.saga.dto.reserve.register.RegisterReserveResponseDTO;
import com.ms.saga.orchestrator.ReserveOrchestrator;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping("/{id}")
    public ResponseEntity<RegisterReserveResponseDTO> registerReserve(@PathVariable @Valid String id, @RequestBody @Valid RegisterReserveRequestDTO reserveRequest) {
          
        return ResponseEntity.ok(saga.processRegisterReserve(reserveRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CancelReserveResponseDTO> cancelReserve(@PathVariable @Valid String id) {
        
        return ResponseEntity.ok(saga.processCancelReserve(id));
    }   
}