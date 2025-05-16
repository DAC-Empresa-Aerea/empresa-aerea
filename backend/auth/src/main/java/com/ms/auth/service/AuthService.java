package com.ms.auth.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ms.auth.config.JwtProperties;
import com.ms.auth.dto.LoginAuthRequestDTO;
import com.ms.auth.dto.LoginAuthResponseDTO;
import com.ms.auth.dto.LogoutAuthDTO;
import com.ms.auth.dto.create.CreateAuthRequestDTO;
import com.ms.auth.dto.create.CreateAuthResponseDTO;
import com.ms.auth.dto.delete.DeleteAuthRequestDTO;
import com.ms.auth.dto.update.UpdateAuthDTO;
import com.ms.auth.exception.BusinessException;
import com.ms.auth.factory.RoleFactory;
import com.ms.auth.model.Auth;
import com.ms.auth.repository.AuthRepository;
import com.ms.auth.util.HashUtil;
import com.ms.auth.util.JWTGeneratorUtil;
import com.ms.auth.util.PasswordGeneratorUtil;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

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
    private JwtProperties jwtProperties;

    @Autowired
    private BlacklistService blacklistService;


    public boolean emailExists(String email) {
        return authRepository.findByLogin(email) != null;
    }

    public CreateAuthResponseDTO createAuth(CreateAuthRequestDTO authRequest) {

        String password = PasswordGeneratorUtil.generate();

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

    public UpdateAuthDTO updateAuth(UpdateAuthDTO authRequest) {
        Auth auth = authRepository.findByLogin(authRequest.getOldEmail());

        if (auth == null) {
            throw new BusinessException(
                "AUTH_NOT_FOUND", 
                "Authentication not found for the given email and role", 
                HttpStatus.NOT_FOUND.value()
            );
        }

        auth.setLogin(authRequest.getNewEmail());

        authRepository.save(auth);

        return authRequest;
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

    public void logout(LogoutAuthDTO dto) {
        Claims claims = Jwts.parserBuilder()
            .setSigningKey(jwtProperties.getSecret().getBytes())
            .build()
            .parseClaimsJws(dto.getToken())
            .getBody();

        String jti = claims.getId();
        Date exp = claims.getExpiration();
        blacklistService.blacklistToken(jti, exp);
    }

}
