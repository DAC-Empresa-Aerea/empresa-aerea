package com.ms.auth.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/hello")
@CrossOrigin(origins = "*")
public class HelloWorld {
    
    @GetMapping
    public String sayHello() {
        return "Hello, Auth Auth Auth!";
    }
}