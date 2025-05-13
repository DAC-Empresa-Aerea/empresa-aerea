package com.ms.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    /**
     * Envia um email com a senha para o usuario
     * @param email
     * @param password
     */
    public void sendPasswordEmail (String email, String password) {
        try{
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Senha FlyHigh");
        message.setText("Sua senha do FlyHigh é " + password + "!");
        mailSender.send(message);
        System.out.println("Email enviado para " + email + " com a senha: " + password);
        }catch (Exception e){
            System.out.println("Erro ao enviar email com senha: " + e.getMessage());
        }

    }

}
