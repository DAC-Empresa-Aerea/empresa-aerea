package com.ms.auth.service;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ms.auth.dto.LoginAuthRequestDTO;
import com.ms.auth.dto.LoginAuthResponseDTO;
import com.ms.auth.dto.Roles;
import com.ms.auth.dto.create.CreateAuthRequestDTO;
import com.ms.auth.dto.create.CreateAuthResponseDTO;
import com.ms.auth.dto.delete.DeleteAuthRequestDTO;
import com.ms.auth.dto.update.UpdateAuthRequestDTO;
import com.ms.auth.dto.update.UpdateAuthResponseDTO;
import com.ms.auth.exception.BusinessException;
import com.ms.auth.factory.RoleFactory;
import com.ms.auth.model.Auth;
import com.ms.auth.repository.AuthRepository;
import com.ms.auth.util.HashUtil;
import com.ms.auth.util.JWTGeneratorUtil;
import com.ms.auth.util.PasswordGeneratorUtil;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validator;

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

    @Autowired
    private Validator validator;

    public CreateAuthResponseDTO createAuth(CreateAuthRequestDTO authRequest) {
        Set<ConstraintViolation<CreateAuthRequestDTO>> violations = validator.validate(authRequest);
        String password = null;

        if(!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }

        if (authRepository.findByLogin(authRequest.getEmail()) != null) {
            throw new BusinessException(
                "AUTH_ALREADY_EXISTS", 
                "Authentication already exists for the given email and role", 
                HttpStatus.BAD_REQUEST.value()
            );
        }
        
        if (authRequest.getRole().equals(Roles.EMPLOYEE)) {
            if(authRequest.getPassword() != null && !authRequest.getPassword().isEmpty()) {
                if(authRequest.getPassword().length() != 4) {
                    throw new BusinessException(
                        "PASSWORD_NOT_ALLOWED", 
                        "Password invalid for the given role", 
                        HttpStatus.BAD_REQUEST.value()
                    );
                }
                password = authRequest.getPassword();    
            } else {
                password = PasswordGeneratorUtil.generate();
            }
        } else {
            password = PasswordGeneratorUtil.generate();
        }

        String salt = HashUtil.generateSalt();
        String hashedPassword = HashUtil.hashPassword(password, salt);

        Auth auth = new Auth();
        auth.setLogin(authRequest.getEmail());
        auth.setRole(roleFactory.getRole(authRequest.getRole()));
        auth.setPassword(hashedPassword);
        auth.setSalt(salt);

        authRepository.save(auth);
        emailService.sendPasswordEmail(auth.getLogin(), password);

        return new CreateAuthResponseDTO(true);
    }

    public UpdateAuthResponseDTO updateAuth(UpdateAuthRequestDTO authRequest) {
        Set<ConstraintViolation<UpdateAuthRequestDTO>> violations = validator.validate(authRequest);

        if(!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }

        Auth auth = authRepository.findByLogin(authRequest.getOldEmail());

        if (auth == null) {
            throw new BusinessException(
                "AUTH_NOT_FOUND", 
                "Authentication not found for the given email and role", 
                HttpStatus.NOT_FOUND.value()
            );
        }

        String salt = null;
        String hashedPassword = null;

        if(authRequest.getPassword() != null && !authRequest.getPassword().isEmpty()) {
            if(authRequest.getPassword().length() != 4) {
                throw new BusinessException(
                    "PASSWORD_NOT_ALLOWED", 
                    "Password invalid for the given role", 
                    HttpStatus.BAD_REQUEST.value()
                );
            }
            salt = HashUtil.generateSalt();
            hashedPassword = HashUtil.hashPassword(authRequest.getPassword(), salt);
        } else {
            salt = auth.getSalt();
            hashedPassword = auth.getPassword();
        }

        auth.setLogin(authRequest.getNewEmail());
        auth.setPassword(hashedPassword);
        auth.setSalt(salt);

        authRepository.save(auth);

        UpdateAuthResponseDTO response = new UpdateAuthResponseDTO();
        response.setNewEmail(authRequest.getNewEmail());
        response.setOldEmail(authRequest.getOldEmail());
        response.setRole(authRequest.getRole());

        return response;
    }

    public LoginAuthResponseDTO login(LoginAuthRequestDTO authRequest) {
        Auth auth = authRepository.findByLogin(authRequest.getLogin());

        if (auth == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"); 
        }

        if (!HashUtil.validatePassword(authRequest.getPassword(), auth.getSalt(), auth.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
        }

        String token = jwtGeneratorUtil.generateToken(
            auth.getLogin(), 
            auth.getRole()
        );

        LoginAuthResponseDTO response = new LoginAuthResponseDTO();
        response.setAccessToken(token);
        response.setTokenType("bearer");
        response.setRole(roleFactory.getRole(auth.getRole()));
        response.setUser(null);

        return response;
    }

    public void deleteAuth(DeleteAuthRequestDTO dto) {
        Auth auth = authRepository.findByLoginAndRole(dto.getEmail(), dto.getRole());

        authRepository.delete(auth);
    }

}
