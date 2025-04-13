package com.ms.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ms.auth.dto.CreateAuthRequestDTO;
import com.ms.auth.dto.CreateAuthResponseDTO;
import com.ms.auth.factory.RoleFactory;
import com.ms.auth.model.Auth;
import com.ms.auth.repository.AuthRepository;
import com.ms.auth.util.HashUtil;
import com.ms.auth.util.PasswordGeneratorUtil;

@Service
public class AuthService {

    @Autowired
    private AuthRepository authRepository;

    @Autowired
    private EmailService emailService;

    @Autowired 
    private RoleFactory roleFactory;

    public CreateAuthResponseDTO createAuth(CreateAuthRequestDTO authRequest) {

        String password = PasswordGeneratorUtil.generate();

        String salt = HashUtil.generateSalt();
        String hashedPassword = HashUtil.hashPassword(password, salt);

        Auth auth = new Auth();
        auth.setLogin(authRequest.getEmail());
        auth.setTipo(roleFactory.getRole(authRequest.getRole()));
        auth.setSenha(hashedPassword);
        auth.setSalt(salt);

        authRepository.save(auth);
        emailService.sendPasswordEmail(auth.getLogin(), password);

        return new CreateAuthResponseDTO(true);
    }
}
