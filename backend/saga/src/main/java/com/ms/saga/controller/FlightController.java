package com.ms.saga.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ms.saga.orchestrator.FlightOrchestrator;

@RestController
@RequestMapping("/voos")
public class FlightController {
    
    @Autowired
    private FlightOrchestrator saga;

}
