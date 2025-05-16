package com.ms.flight.infrastructure.database;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ms.flight.repository.AirportRepository;
import com.ms.flight.repository.FlightRepository;
import com.ms.flight.repository.FlightStatusRepository;
import com.ms.flight.seed.DataSeeder;

import java.util.List;

@Service
public class DatabaseResetService {

    private final AirportRepository airportRepository;
    private final FlightRepository flightRepository;
    private final FlightStatusRepository statusRepository;

    private final List<DataSeeder> seeders;

    public DatabaseResetService(
        AirportRepository airportRepository,
        FlightRepository flightRepository,
        FlightStatusRepository statusRepository,
        List<DataSeeder> seeders
    ) {
        this.airportRepository = airportRepository;
        this.flightRepository = flightRepository;
        this.statusRepository = statusRepository;
        this.seeders = seeders;
    }

    @Transactional
    public void resetDatabase() {
        flightRepository.deleteAll();
        airportRepository.deleteAll();
        statusRepository.deleteAll();

        seeders.forEach(DataSeeder::seed);
    }
}


