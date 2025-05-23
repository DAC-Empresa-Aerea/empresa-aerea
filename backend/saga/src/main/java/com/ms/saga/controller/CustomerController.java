package com.ms.saga.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ms.saga.dto.customer.CustomerRequestDTO;
import com.ms.saga.dto.customer.CustomerResponseDTO;
import com.ms.saga.orchestrator.CustomerOrchestrator;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/clientes")
public class CustomerController {
    
    @Autowired
    private CustomerOrchestrator saga;
    
    @PostMapping()
    public ResponseEntity<CustomerResponseDTO> createCustomer(@RequestBody CustomerRequestDTO customer) {
        
        return ResponseEntity.status(HttpStatus.CREATED).body(saga.processRegisterCustomer(customer));
    }
    
}
