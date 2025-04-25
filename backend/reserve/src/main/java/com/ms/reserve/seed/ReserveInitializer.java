package com.ms.reserve.seed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.ms.reserve.command.repository.ReserveStatusCommandRepository;

@Component
public class ReserveInitializer implements ApplicationRunner {
    
    @Autowired
    private ReserveStatusCommandRepository commandRepository;

    @Override
    public void run(ApplicationArguments args) {
        
    }
}
