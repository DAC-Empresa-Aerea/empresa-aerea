package com.ms.flight.seed;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.ms.flight.enums.FlightStatusEnum;
import com.ms.flight.model.FlightStatus;
import com.ms.flight.repository.FlightStatusRepository;

@Configuration
public class FlightStatusInitializer {

    @Bean
    public ApplicationRunner initFlightStatuses(FlightStatusRepository repository) {
        return args -> {
            for (FlightStatusEnum statusEnum : FlightStatusEnum.values()) {
                boolean exists = repository.existsById(statusEnum.getCodigo());

                if (!exists) {
                    FlightStatus status = new FlightStatus(
                        statusEnum.getCodigo(),
                        statusEnum.getSigla(),
                        statusEnum.getDescricao()
                    );
                    repository.save(status);
                }
            }
        };
    }
}

