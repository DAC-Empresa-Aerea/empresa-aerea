package com.ms.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LoginAuthRequestDTO {

    @Email(message = "O login deve ser um e-mail válido")
    private String login;

    @Size(min = 4, max = 4, message = "A senha deve ter 4 caracteres")
    private String senha;
}
