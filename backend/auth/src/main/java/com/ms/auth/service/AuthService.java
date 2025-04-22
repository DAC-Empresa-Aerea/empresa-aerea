package com.ms.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ms.auth.dto.CreateAuthRequestDTO;
import com.ms.auth.dto.CreateAuthResponseDTO;
import com.ms.auth.dto.LoginAuthRequestDTO;
import com.ms.auth.dto.LoginAuthResponseDTO;
import com.ms.auth.factory.RoleFactory;
import com.ms.auth.model.Auth;
import com.ms.auth.repository.AuthRepository;
import com.ms.auth.util.HashUtil;
import com.ms.auth.util.JWTGeneratorUtil;
import com.ms.auth.util.PasswordGeneratorUtil;

@Service
public class AuthService {

    @Autowired
    private AuthRepository authRepository;

    @Autowired
    private EmailService emailService;

    @Autowired 
    private RoleFactory roleFactory;

    @Autowired
    private JWTGeneratorUtil jwtGeneratorUtil;

    public boolean emailExists(String email) {
        return authRepository.findByLogin(email) != null;
    }

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

    public LoginAuthResponseDTO login(LoginAuthRequestDTO authRequest) {
        Auth auth = authRepository.findByLogin(authRequest.getLogin());

        if (auth == null) {
            throw new RuntimeException("User not found"); 
        }

        String hashedPassword = HashUtil.hashPassword(authRequest.getSenha(), auth.getSalt());

        if (!hashedPassword.equals(auth.getSenha())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtGeneratorUtil.generateToken(
            auth.getLogin(), 
            auth.getTipo()
        );

        LoginAuthResponseDTO response = new LoginAuthResponseDTO();
        response.setAccessToken(token);
        response.setTokenType("bearer");
        response.setTipo(roleFactory.getRole(auth.getTipo()));
        response.setUsuario(null);

        return response;
    }

}
