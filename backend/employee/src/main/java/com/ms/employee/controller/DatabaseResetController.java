package com.ms.employee.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.ms.employee.infrastructure.database.DatabaseResetService;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class DatabaseResetController {
    
    @Autowired
    private DatabaseResetService databaseResetService;

    @GetMapping("/reboot")
    public void rebootDatabase() {
        databaseResetService.resetDatabase();
    }

}
