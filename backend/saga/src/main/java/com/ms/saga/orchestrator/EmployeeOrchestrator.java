package com.ms.saga.orchestrator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ms.saga.producer.AuthProducer;
import com.ms.saga.producer.EmployeeProducer;

@Component
public class EmployeeOrchestrator {

    @Autowired
    private AuthProducer authProducer;

    @Autowired
    private EmployeeProducer employeeProducer;


    
}
