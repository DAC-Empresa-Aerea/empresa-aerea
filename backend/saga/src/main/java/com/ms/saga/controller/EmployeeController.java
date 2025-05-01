package com.ms.saga.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ms.saga.dto.employee.EmployeeRequestDTO;
import com.ms.saga.dto.employee.EmployeeResponseDTO;
import com.ms.saga.orchestrator.EmployeeOrchestrator;

@RestController
@RequestMapping("/funcionarios")
public class EmployeeController {
    
    @Autowired
    private EmployeeOrchestrator saga;

    @PostMapping()
    public ResponseEntity<EmployeeResponseDTO> createEmployee(@RequestBody EmployeeRequestDTO employee) {
        
        return ResponseEntity.status(HttpStatus.CREATED).body(saga.processRegisterEmployee(employee));
    }
    
}
