package com.ms.employee.seed;

import java.util.List;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class SeedRunner implements ApplicationRunner {

    private final List<DataSeeder> seeders;

    public SeedRunner(List<DataSeeder> seeders) {
        this.seeders = seeders;
    }

    @Override
    public void run(ApplicationArguments args) {
        seeders.forEach(DataSeeder::seed);
    }
}

