package com.ms.employee.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ms.employee.dto.employee.EmployeeRequestDTO;
import com.ms.employee.dto.employee.EmployeeResponseDTO;
import com.ms.employee.service.EmployeeService;

@RestController
@RequestMapping("/funcionarios")
public class EmployeeController {

    //#region Injeção de Dependencia
    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }
    //#endregion

    @GetMapping 
    public ResponseEntity<List<EmployeeResponseDTO>> getAllEmployees() {
        List<EmployeeResponseDTO> employees = employeeService.getAllEmployees().stream()
                .map(employee -> {
                    EmployeeResponseDTO dto = new EmployeeResponseDTO();
                    dto.setId(employee.getId());
                    dto.setCpf(employee.getCpf());
                    dto.setEmail(employee.getEmail());
                    dto.setName(employee.getName());
                    dto.setPhoneNumber(employee.getPhoneNumber());
                    return dto;
                }) 
                .toList();
                if(employees.isEmpty()) {
                    return ResponseEntity.noContent().build();
                }
                return ResponseEntity.ok(employees);
    }

    @GetMapping  ("/{id}")
    public ResponseEntity<EmployeeResponseDTO> getEmployee(@PathVariable Long id) {
        EmployeeResponseDTO dto = employeeService.findById(id);
        return ResponseEntity.ok(dto);
    }

    @PutMapping ("/{id}")
    public ResponseEntity<EmployeeResponseDTO> updateEmployee(@PathVariable Long id, @RequestBody EmployeeRequestDTO dto) {
        EmployeeResponseDTO responseDTO = employeeService.updateEmployee(id, dto);
        return ResponseEntity.ok(responseDTO);
    }

    @DeleteMapping ("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }
}
