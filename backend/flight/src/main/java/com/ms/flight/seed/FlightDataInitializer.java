package com.ms.flight.seed;

import com.ms.flight.enums.FlightStatusEnum;
import com.ms.flight.model.Airport;
import com.ms.flight.model.Flight;
import com.ms.flight.model.FlightStatus;
import com.ms.flight.repository.AirportRepository;
import com.ms.flight.repository.FlightRepository;
import com.ms.flight.repository.FlightStatusRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;

@Component
public class FlightDataInitializer implements DataSeeder {

    private final AirportRepository airportRepository;
    private final FlightRepository flightRepository;
    private final FlightStatusRepository statusRepository;

    public FlightDataInitializer(
        AirportRepository airportRepository,
        FlightRepository flightRepository,
        FlightStatusRepository statusRepository
    ) {
        this.airportRepository = airportRepository;
        this.flightRepository = flightRepository;
        this.statusRepository = statusRepository;
    }

    @Override
    @Transactional
    public void seed() {
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

        FlightStatus status = statusRepository.findById(FlightStatusEnum.CONFIRMED.getCodigo())
            .orElseThrow(() -> new IllegalStateException("Status 'CONFIRMADO' não encontrado."));

        List<Flight> flights = List.of(
            new Flight("VOOS0001", OffsetDateTime.parse("2025-08-10T10:30:00-03:00"), new BigDecimal("450.00"), 180, 0,
                status, getAirport("POA"), getAirport("CWB")),
            new Flight("VOOS0002", OffsetDateTime.parse("2025-09-11T09:30:00-03:00"), new BigDecimal("600.00"), 150, 0,
                status, getAirport("CWB"), getAirport("GIG")),
            new Flight("VOOS0003", OffsetDateTime.parse("2025-10-12T08:30:00-03:00"), new BigDecimal("400.00"), 160, 0,
                status, getAirport("CWB"), getAirport("POA"))
        );

        for (Flight flight : flights) {
            if (!flightRepository.existsById(flight.getCodigo())) {
                flightRepository.save(flight);
            }
        }
    }

    private Airport getAirport(String code) {
        return airportRepository.findById(code)
            .orElseThrow(() -> new IllegalStateException("Aeroporto com código " + code + " não encontrado."));
    }
}
