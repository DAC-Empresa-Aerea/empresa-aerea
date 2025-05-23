package com.ms.auth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

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

    @JsonProperty("login")
    @Email(message = "O login deve ser um e-mail válido")
    private String login;

    @JsonProperty("senha")
    @Size(min = 4, max = 4, message = "A senha deve ter 4 caracteres")
    private String password;
}
