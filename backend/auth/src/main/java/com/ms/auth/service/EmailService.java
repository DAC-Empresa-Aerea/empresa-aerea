package com.ms.auth.service;

import org.springframework.stereotype.Service;

@Service
public class EmailService {

    public void sendPasswordEmail (String email, String password) {
        System.out.println("Email enviado para " + email + " com a senha: " + password);
    }

}
