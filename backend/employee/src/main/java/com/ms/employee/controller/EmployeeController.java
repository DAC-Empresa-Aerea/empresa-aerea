package com.ms.employee.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmployeeController {

    @GetMapping ("/funcionarios")
    public void getAllEmployees() {
        // TODO - Implementar lógica para retornar todos os funcionários

    }

    @PostMapping ("/funcionarios")
    public void createEmployee() {
        // TODO - Implementar lógica para criar um novo funcionário
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
