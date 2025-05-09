package com.ms.auth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LogoutAuthDTO {
    
    @JsonProperty("login")
    @Email(message = "O login deve ser um e-mail válido")
    private String login;

    @JsonProperty("token")    
    private String token;

}
