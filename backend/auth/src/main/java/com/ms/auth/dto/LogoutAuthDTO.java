package com.ms.auth.dto;

import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LogoutAuthDTO {
    @Email(message = "O login deve ser um e-mail válido")
    private String login;
    private String token;
}
