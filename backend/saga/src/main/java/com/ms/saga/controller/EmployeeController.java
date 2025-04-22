package com.ms.saga.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ms.saga.orchestrator.EmployeeOrchestrator;

@Component
public class EmployeeController {
    
    @Autowired
    private EmployeeOrchestrator saga;

}
