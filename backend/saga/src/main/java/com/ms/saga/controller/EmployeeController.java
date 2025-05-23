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
import com.ms.saga.dto.employee.delete.DeleteEmployeeResponseDTO;
import com.ms.saga.dto.employee.update.UpdateEmployeeRequestDTO;
import com.ms.saga.dto.employee.update.EmployeeUpdatedResponseDTO;
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
    public ResponseEntity<EmployeeUpdatedResponseDTO> updateEmployee(
            @PathVariable Long id,
            @RequestBody UpdateEmployeeRequestDTO employee) {
                
        return ResponseEntity.ok(saga.processUpdateEmployee(id, employee));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<DeleteEmployeeResponseDTO> deleteEmployee(@PathVariable Long id) {
        DeleteEmployeeResponseDTO deleted = saga.processDeleteEmployee(id);
        return ResponseEntity.ok(deleted);
    }
}
