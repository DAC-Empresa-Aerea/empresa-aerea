package com.ms.saga.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ms.saga.orchestrator.EmployeeOrchestrator;

@Controller
@RequestMapping("/funcionarios")
public class EmployeeController {
    
    @Autowired
    private EmployeeOrchestrator saga;

}
