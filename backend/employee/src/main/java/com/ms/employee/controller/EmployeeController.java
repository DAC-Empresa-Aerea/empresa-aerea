package com.ms.employee.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ms.employee.dto.employee.EmployeeResponseDTO;
import com.ms.employee.service.EmployeeService;

@RestController
@RequestMapping("/funcionarios")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/email/{email}")
    public ResponseEntity<EmployeeResponseDTO> getEmployeeByEmail(@PathVariable String email) {
        EmployeeResponseDTO dto = employeeService.findByEmail(email);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> getEmployeeById(@PathVariable Long id) {
        EmployeeResponseDTO dto = employeeService.findByIdAndActive(id);
        return ResponseEntity.ok(dto);
    }
    

    @GetMapping 
    public ResponseEntity<List<EmployeeResponseDTO>> getAllEmployees() {

        return ResponseEntity.ok(employeeService.getAllActiveEmployees());
    }

}
