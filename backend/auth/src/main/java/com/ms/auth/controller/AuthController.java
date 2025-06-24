package com.ms.auth.controller;

import org.springframework.web.bind.annotation.RestController;

import com.ms.auth.dto.LoginAuthRequestDTO;
import com.ms.auth.dto.LoginAuthResponseDTO;
import com.ms.auth.dto.LogoutAuthDTO;
import com.ms.auth.service.AuthService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public LoginAuthResponseDTO login(@RequestBody @Valid LoginAuthRequestDTO entity) {

        LoginAuthResponseDTO response = authService.login(entity);
        
        return response;
    }

    @PostMapping("/logout")
    public ResponseEntity<LogoutAuthDTO> logout(
            @RequestBody LogoutAuthDTO dto,
            @RequestHeader("Authorization") String authHeader,
            HttpServletResponse response
    ) {
        Cookie cookie = new Cookie("access-token", "");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);

        response.addCookie(cookie);

        return ResponseEntity.ok(dto);
    }
    
}
