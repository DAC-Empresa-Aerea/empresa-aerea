package com.ms.reserve.seed;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.ms.reserve.command.model.ReserveStatusCommand;
import com.ms.reserve.command.repository.ReserveStatusCommandRepository;
import com.ms.reserve.enums.StatusEnum;

@Configuration
public class ReserveStatusInitializer {

    @Bean
    public ApplicationRunner initReserveStatuses(
        ReserveStatusCommandRepository commandRepository
    ) {
        return args -> {
            for (StatusEnum statusEnum : StatusEnum.values()) {
                
                boolean existsInCommand = commandRepository.existsById(statusEnum.getCode());
                if (!existsInCommand) {
                    ReserveStatusCommand commandStatus = new ReserveStatusCommand(
                        statusEnum.getCode(),
                        statusEnum.getAbbreviation(),
                        statusEnum.getDescription()
                    );
                    commandRepository.save(commandStatus);
                }
                
            }
        };
    }
}
