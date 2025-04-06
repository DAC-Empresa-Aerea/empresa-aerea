package com.ms.customer.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    public String getCliente(@RequestParam Long id) {
        return clienteRepository.findById(id).map(cliente -> cliente.getNome()).orElse("Cliente não encontrado");
    }

    @GetMapping("/cliente/{id}/milhas")
    public String milesStatement(@PathVariable String id) {
        
        return "Milhas do cliente " + id;
    }

    @PutMapping("/cliente/{id}/milhas")
    public String sumMiles(@PathVariable String id, @RequestBody String entity) {
        
        return entity;
    }
    
}
