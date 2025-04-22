package com.ms.flight.seed;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.ms.flight.model.FlightStatus;
import com.ms.flight.repository.FlightStatusRepository;

@Component
public class FlightStatusInitializer implements ApplicationRunner {

    @Autowired
    private FlightStatusRepository flightStatusRepository;

    private static final List<FlightStatus> STATUS_INICIAIS = List.of(
        new FlightStatus("CONFIRMADO", "CON", "Voo confirmado"),
        new FlightStatus("REALIZADO", "REA", "Voo realizado"),
        new FlightStatus("CANCELADO", "CAN", "Voo cancelada")
    );

    @Override
    public void run(ApplicationArguments args) {
        if (flightStatusRepository.count() == 0) {
            flightStatusRepository.saveAll(STATUS_INICIAIS);
        }
    }
}

