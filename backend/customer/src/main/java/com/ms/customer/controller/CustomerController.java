package com.ms.customer.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ms.customer.dto.CheckMileResponseDTO;
import com.ms.customer.dto.CustomerResponseDTO;
import com.ms.customer.dto.UpdateMilesRequestDTO;
import com.ms.customer.dto.UpdateMilesResponseDTO;
import com.ms.customer.repository.ClienteRepository;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class CustomerController {

    private final ClienteRepository clienteRepository;

    CustomerController(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }
    
    @GetMapping("/cliente/{id}")
    public ResponseEntity<CustomerResponseDTO> getCliente(@RequestParam Long id) {

        
        return null;
    }

    @GetMapping("/cliente/{id}/milhas")
    public ResponseEntity<CheckMileResponseDTO> milesStatement(@PathVariable String id) {

        // Codigo Simulado para o retorno do saldo de milhas
        CheckMileResponseDTO response = new CheckMileResponseDTO();
        response.setCodigo(Long.valueOf(id));
        response.setSaldoMilhas(1000);
        response.setTransacoes(null);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/cliente/{id}/milhas")
    public ResponseEntity<UpdateMilesResponseDTO> sumMiles(@PathVariable String id, @RequestBody UpdateMilesRequestDTO entity) {

        // Codigo Simulado para o retorno do saldo de milhas
        UpdateMilesResponseDTO response = new UpdateMilesResponseDTO();
        response.setCodigo(Long.valueOf(id));
        response.setSaldoMilhas(entity.getQuantidade() + 1000);
        return ResponseEntity.ok(response);

    }
    
}
