package com.ms.flight.seed;

import com.ms.flight.enums.FlightStatusEnum;
import com.ms.flight.model.Airport;
import com.ms.flight.model.Flight;
import com.ms.flight.model.FlightStatus;
import com.ms.flight.repository.AirportRepository;
import com.ms.flight.repository.FlightRepository;
import com.ms.flight.repository.FlightStatusRepository;

import jakarta.transaction.Transactional;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class FlightDataInitializer {

    @Bean
    public ApplicationRunner initializeFlightData(
        AirportRepository airportRepository,
        FlightRepository flightRepository,
        FlightStatusRepository statusRepository,
        FlightStatusRepository flightStatusRepository
    ) {
        return new ApplicationRunner() {
            @Override
            @Transactional
            public void run(ApplicationArguments args) {
                for (FlightStatusEnum statusEnum : FlightStatusEnum.values()) {
                    boolean exists = statusRepository.existsById(statusEnum.getCodigo());
    
                    if (!exists) {
                        FlightStatus status = new FlightStatus(
                            statusEnum.getCodigo(),
                            statusEnum.getSigla(),
                            statusEnum.getDescricao()
                        );
                        statusRepository.save(status);
                    }
                }

                List<Airport> airports = List.of(
                    new Airport("GRU", "Aeroporto Internacional de São Paulo/Guarulhos", "Guarulhos", "SP"),
                    new Airport("CWB", "Aeroporto Internacional Afonso Pena", "São José dos Pinhais", "PR"),
                    new Airport("GIG", "Aeroporto Internacional Tom Jobim (Galeão)", "Rio de Janeiro", "RJ"),
                    new Airport("POA", "Aeroporto Internacional Salgado Filho", "Porto Alegre", "RS")
                );

                for (Airport airport : airports) {
                    if (!airportRepository.existsById(airport.getCodigo())) {
                        airportRepository.save(airport);
                    }
                }

                FlightStatusEnum enumStatus = FlightStatusEnum.CONFIRMADO;
                FlightStatus status = flightStatusRepository.findById(enumStatus.getCodigo())
                    .orElseThrow(() -> new IllegalStateException("Status 'CONFIRMADO' não encontrado. Execute FlightStatusInitializer primeiro."));

                List<Flight> flights = List.of(
                    new Flight("VOOS0001",
                        LocalDateTime.parse("2025-08-10T10:30:00"),
                        new BigDecimal("450.00"),
                        180,
                        0,
                        status,
                        airportRepository.findById("POA").orElseThrow(),
                        airportRepository.findById("CWB").orElseThrow()
                    ),
                    new Flight("VOOS0002",
                        LocalDateTime.parse("2025-09-11T09:30:00"),
                        new BigDecimal("600.00"),
                        150,
                        0,
                        status,
                        airportRepository.findById("CWB").orElseThrow(),
                        airportRepository.findById("GIG").orElseThrow()
                    ),
                    new Flight("VOOS0003",
                        LocalDateTime.parse("2025-10-12T08:30:00"),
                        new BigDecimal("400.00"),
                        160,
                        0,
                        status,
                        airportRepository.findById("CWB").orElseThrow(),
                        airportRepository.findById("POA").orElseThrow()
                    )
                );

                for (Flight flight : flights) {
                    if (!flightRepository.existsById(flight.getCodigo())) {
                        flightRepository.save(flight);
                    }
                }
            }
        };
    }
}
