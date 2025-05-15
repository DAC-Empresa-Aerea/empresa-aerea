package com.ms.saga.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ms.saga.dto.employee.EmployeeRequestDTO;
import com.ms.saga.dto.employee.EmployeeResponseDTO;
import com.ms.saga.dto.employee.update.EmployeeUpdateRequestDTO;
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
    
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> updateEmployee(
            @PathVariable Long id,
            @RequestBody EmployeeUpdateRequestDTO employee) {
                
        return ResponseEntity.ok(saga.processUpdateEmployee(id, employee));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> deleteEmployee(@PathVariable("id") Long id) {
        EmployeeResponseDTO deleted = saga.processDeleteEmployee(id);
        return ResponseEntity.ok(deleted);
    }
}
