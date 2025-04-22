package com.ms.employee.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ms.employee.dto.EmployeeResponseDTO;
import com.ms.employee.model.Employee;
import com.ms.employee.dto.EmployeeRequestDTO;
import com.ms.employee.service.EmployeeService;

@RestController
public class EmployeeController {

    //#region Injeção de Dependencia
    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }
    //#endregion

    @GetMapping ("/funcionarios")
    public List<EmployeeResponseDTO> getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        return employees.stream()
                .map(employee -> new EmployeeResponseDTO(employee.getId(), employee.getCpf(), employee.getEmail(), employee.getNome(), employee.getTelefone()))
                .toList();
    }

    @PostMapping ("/funcionarios")
    public EmployeeResponseDTO createEmployee(@RequestBody EmployeeRequestDTO dto) {
        Employee employee = employeeService.createEmployee(dto);
        return new EmployeeResponseDTO(employee.getId(), employee.getCpf(), employee.getEmail(), employee.getNome(), employee.getTelefone());
    }

    @PutMapping ("/funcionarios/{id}")
    public EmployeeResponseDTO updateEmployee(@PathVariable Long id, @RequestBody EmployeeRequestDTO dto) {
        Employee employee = employeeService.updateEmployee(id, dto);
        return new EmployeeResponseDTO(employee.getId(), employee.getCpf(), employee.getEmail(), employee.getNome(), employee.getTelefone());
    }

    @DeleteMapping ("/funcionarios/{id}")
    public void deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
    }
}
