package com.ms.auth.infrastructure.database;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ms.auth.repository.AuthRepository;
import com.ms.auth.seed.DataSeeder;

import java.util.List;

@Service
public class DatabaseResetService {

    private final AuthRepository authRepository;
    private final List<DataSeeder> seeders;

    public DatabaseResetService(
        AuthRepository authRepository,
        List<DataSeeder> seeders
    ) {
        this.authRepository = authRepository;
        this.seeders = seeders;
    }

    @Transactional
    public void resetDatabase() {
        authRepository.deleteAll();

        seeders.forEach(DataSeeder::seed);
    }
}


