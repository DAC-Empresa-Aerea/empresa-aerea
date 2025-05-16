package com.ms.customer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.RestController;

import com.ms.customer.infrastructure.database.DatabaseResetService;

import org.springframework.web.bind.annotation.GetMapping;


@Profile("dev")
@RestController
public class DatabaseResetController {
    
    @Autowired
    private DatabaseResetService databaseResetService;

    @GetMapping("/reboot")
    public void rebootDatabase() {
        databaseResetService.resetDatabase();
    }

}
