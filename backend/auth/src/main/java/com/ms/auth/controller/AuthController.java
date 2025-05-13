package com.ms.auth.controller;

import org.springframework.web.bind.annotation.RestController;

import com.ms.auth.dto.LoginAuthRequestDTO;
import com.ms.auth.dto.LoginAuthResponseDTO;
import com.ms.auth.service.AuthService;
import com.ms.auth.service.EmailService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class AuthController {

    @Autowired
    private AuthService authService;
    @Autowired
    private EmailService emailService;

    @PostMapping("/login")
    public LoginAuthResponseDTO postMethodName(@RequestBody @Valid LoginAuthRequestDTO entity) {

        LoginAuthResponseDTO response = authService.login(entity);
        
        return response;
    }
    
     @PostMapping("/send")
    public String sendEmail(@RequestParam String to, @RequestParam String password) {
        emailService.sendPasswordEmail(to, password);
        return "E-mail enviado para " + to;
    }
    
}
