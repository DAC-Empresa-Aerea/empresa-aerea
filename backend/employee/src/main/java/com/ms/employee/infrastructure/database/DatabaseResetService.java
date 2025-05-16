package com.ms.employee.infrastructure.database;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ms.employee.repository.EmployeeRepository;
import com.ms.employee.seed.DataSeeder;

import java.util.List;

@Service
public class DatabaseResetService {

    private final EmployeeRepository employeeRepository;
    private final List<DataSeeder> seeders;

    public DatabaseResetService(
        EmployeeRepository employeeRepository,
        List<DataSeeder> seeders
    ) {
        this.employeeRepository = employeeRepository;
        this.seeders = seeders;
    }

    @Transactional
    public void resetDatabase() {
        employeeRepository.deleteAll();

        seeders.forEach(DataSeeder::seed);
    }
}

