package com.ms.auth.util;

import java.util.Date;
import java.util.UUID;

import org.springframework.stereotype.Component;

import com.ms.auth.config.JwtProperties;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JWTGeneratorUtil {

    private final JwtProperties jwtProperties;

    public JWTGeneratorUtil(JwtProperties jwtProperties) {
        this.jwtProperties = jwtProperties;
    }

    public String generateToken(String subject, String role) {
        String jti = UUID.randomUUID().toString();
        Date now = new Date();
        Date exp = new Date(now.getTime() + 3600000);

        return Jwts.builder()
            .setId(jti)
            .setSubject(subject)
            .claim("role", role)
            .setIssuedAt(now)
            .setExpiration(exp)
            .signWith(
                Keys.hmacShaKeyFor(jwtProperties.getSecret().getBytes()), 
                SignatureAlgorithm.HS256
            ).compact();
    }
}

