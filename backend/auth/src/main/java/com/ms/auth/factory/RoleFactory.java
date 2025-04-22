package com.ms.auth.factory;

import org.springframework.stereotype.Component;

@Component
public class RoleFactory {

    public String getRole(String input) {
        if (input == null || input.isBlank()) {
            throw new IllegalArgumentException("Role inválida: valor nulo ou vazio.");
        }

        return switch (input.toUpperCase()) {
            case "CLIENTE" -> "CLIENTE";
            case "FUNCIONARIO" -> "FUNCIONARIO";
            default -> throw new IllegalArgumentException("Role não reconhecida: " + input);
        };
    }
}
