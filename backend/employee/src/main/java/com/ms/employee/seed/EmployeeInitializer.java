package com.ms.employee.seed;

import org.springframework.stereotype.Component;

import com.ms.employee.model.Employee;
import com.ms.employee.repository.EmployeeRepository;

import java.util.List;

@Component
public class EmployeeInitializer implements DataSeeder {

    private final EmployeeRepository employeeRepository;

    public EmployeeInitializer(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public void seed() {
        List<Employee> predefinedEmployees = List.of(
            new Employee(null, "90769281001", "func_pre@gmail.com", "Funcionario Pre", "11999999999", true)
        );

        for (Employee emp : predefinedEmployees) {
            if (!employeeRepository.existsByCpf(emp.getCpf())) {
                employeeRepository.save(emp);
            }
        }
    }
}
