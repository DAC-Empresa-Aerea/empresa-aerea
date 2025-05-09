package com.ms.customer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ms.customer.dto.CheckMileResponseDTO;
import com.ms.customer.dto.customer.CustomerResponseDTO;
import com.ms.customer.dto.updateMiles.UpdateMilesRequestDTO;
import com.ms.customer.dto.updateMiles.UpdateMilesResponseDTO;
import com.ms.customer.repository.CustomerRepository;
import com.ms.customer.service.CustomerService;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/clientes")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private CustomerRepository clienteRepository;

    @GetMapping
    public ResponseEntity<List<CustomerResponseDTO>> getAllCustomers() {
        List<CustomerResponseDTO> customers = clienteRepository.findAll().stream()
                .map(customer -> {
                    CustomerResponseDTO dto = new CustomerResponseDTO();
                    dto.setCode(customer.getCode());
                    dto.setName(customer.getName());
                    dto.setEmail(customer.getEmail());
                    return dto;
                })
                .toList();
        if (customers.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(customers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponseDTO> getCustomer(@PathVariable Long id) {
        CustomerResponseDTO dto = customerService.findById(id);
        return ResponseEntity.ok(dto);
    }
    
    @GetMapping("/email/{email}")
    public ResponseEntity<CustomerResponseDTO> getCustomerByEmail(@PathVariable String email) {
        CustomerResponseDTO dto = customerService.findByEmail(email);
        if (dto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/{id}/milhas")
    public ResponseEntity<CheckMileResponseDTO> milesStatement(@PathVariable Long id) {
        CheckMileResponseDTO response = customerService.getMilesStatement(id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/milhas")
    public ResponseEntity<UpdateMilesResponseDTO> sumMiles(@PathVariable Long id, @RequestBody UpdateMilesRequestDTO entity) {
        UpdateMilesResponseDTO response = customerService.updateMiles(id, entity);
        return ResponseEntity.ok(response);
    }

}