package com.ms.auth.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class GenericController {
    
    @GetMapping("/hello")
    public String getHello() {
        return new String("Hello Auth");
    }
    
}
