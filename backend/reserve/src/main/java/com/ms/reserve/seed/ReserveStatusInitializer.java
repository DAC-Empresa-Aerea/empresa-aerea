package com.ms.reserve.seed;

import org.springframework.stereotype.Component;

import com.ms.reserve.command.model.ReserveStatusCommand;
import com.ms.reserve.command.repository.ReserveStatusCommandRepository;
import com.ms.reserve.enums.StatusEnum;

@Component
public class ReserveStatusInitializer implements DataSeeder {

    private final ReserveStatusCommandRepository commandRepository;

    public ReserveStatusInitializer(ReserveStatusCommandRepository commandRepository) {
        this.commandRepository = commandRepository;
    }

    @Override
    public void seed() {
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
    }
}
