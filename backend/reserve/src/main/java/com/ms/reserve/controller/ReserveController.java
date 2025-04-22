package com.ms.reserve.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ms.reserve.dto.reserve.ReserveResponseDTO;
import com.ms.reserve.dto.status.StatusDTO;
import com.ms.reserve.service.ReserveService;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/reservas")
public class ReserveController {

    @Autowired
    private ReserveService reserveService;

    @GetMapping("/{id}")
    public ResponseEntity<ReserveResponseDTO> getReserve(@PathVariable @Valid String id) {

        return ResponseEntity.ok(reserveService.getReserveById(id));
    }
    
    @PatchMapping("/{id}/estado")
    public ResponseEntity<String> updateReserve(@PathVariable @Valid String id, @RequestBody @Valid StatusDTO status) {
        // Validar se status é um valor válido (aqui só CHECKIN e EMBARCADA são válidos)
        // Validar se a pessoa tem acesso para alterar o status atual para o novo status (CHECKIN PARA CLIENTE E EMBARCADA PARA FUNCIONARIO)
        // Alterar valor aqui e retornar o status correto
        
        return ResponseEntity.ok(status.getStatus());
    }
    
}
