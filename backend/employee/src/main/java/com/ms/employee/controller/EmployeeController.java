package com.ms.employee.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ms.employee.dto.employee.EmployeeResponseDTO;
import com.ms.employee.service.EmployeeService;

@RestController
@RequestMapping("/funcionarios")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping 
    public ResponseEntity<List<EmployeeResponseDTO>> getAllEmployees() {

        return ResponseEntity.ok(employeeService.getAllActiveEmployees());
    }

}
