package com.ms.employee.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ms.employee.dto.EmployeeDTO;
import com.ms.employee.model.Employee;
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
    public void getAllEmployees() {
        employeeService.getAllEmployees();
        }

    @PostMapping ("/funcionarios")
    public void createEmployee(@RequestBody EmployeeDTO dto) {
        employeeService.createEmployee(dto);
    }

    @PutMapping ("/funcionarios/{id}")
    public void updateEmployee() {
        // TODO - Implementar lógica para atualizar um funcionário existente
    }

    @DeleteMapping ("/funcionarios/{id}")
    public void deleteEmployee() {
        // TODO - Implementar lógica para deletar um funcionário existente
    }
}
