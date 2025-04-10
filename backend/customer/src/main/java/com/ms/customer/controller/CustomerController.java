package com.ms.customer.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ms.customer.dto.CheckMileResponseDTO;
import com.ms.customer.dto.customer.CustomerRequestDTO;
import com.ms.customer.dto.customer.CustomerResponseDTO;
import com.ms.customer.dto.updateMiles.UpdateMilesRequestDTO;
import com.ms.customer.dto.updateMiles.UpdateMilesResponseDTO;
import com.ms.customer.model.Address;
import com.ms.customer.model.Customer;
import com.ms.customer.service.CustomerService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/clientes")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping()
    public ResponseEntity<CustomerResponseDTO> postMethodName(@RequestBody @Valid CustomerRequestDTO entity) {
        Customer customer = new Customer();
        BeanUtils.copyProperties(entity, customer);

        System.out.println(entity.getSaldoMilhas());

        Address address = new Address();
        BeanUtils.copyProperties(entity.getEndereco(), address);
        customer.setEndereco(address);

        return ResponseEntity.status(HttpStatus.CREATED).body(customerService.save(customer));
    }
    

    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponseDTO> getCliente(@PathVariable Long id) {
        CustomerResponseDTO dto = customerService.findById(id);
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