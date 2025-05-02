package com.ms.auth.controller;

import org.springframework.web.bind.annotation.RestController;

import com.ms.auth.dto.LoginAuthRequestDTO;
import com.ms.auth.dto.LoginAuthResponseDTO;
import com.ms.auth.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public LoginAuthResponseDTO login(@RequestBody @Valid LoginAuthRequestDTO entity) {

        LoginAuthResponseDTO response = authService.login(entity);
        
        return response;
    }
    
}
