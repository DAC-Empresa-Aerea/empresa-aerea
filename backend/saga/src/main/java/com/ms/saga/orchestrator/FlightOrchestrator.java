package com.ms.saga.orchestrator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ms.saga.producer.FlightProducer;

@Component
public class FlightOrchestrator {

    @Autowired
    private FlightProducer flightProducer;
    
}
