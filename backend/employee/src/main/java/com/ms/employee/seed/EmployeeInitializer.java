package com.ms.employee.seed;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.ms.employee.model.Employee;
import com.ms.employee.repository.EmployeeRepository;

import java.util.List;

@Configuration
public class EmployeeInitializer {

    @Bean
    public ApplicationRunner initEmployees(EmployeeRepository repository) {
        return args -> {
            List<Employee> predefinedEmployees = List.of(
                new Employee(null, "90769281001", "func_pre@gmail.com", "Funcionario Pre", "11999999999")
            );

            for (Employee emp : predefinedEmployees) {
                if (!repository.existsByCpf(emp.getCpf())) {
                    repository.save(emp);
                }
            }
        };
    }
}
