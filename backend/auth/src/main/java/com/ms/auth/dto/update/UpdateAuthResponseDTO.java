package com.ms.auth.dto.update;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UpdateAuthResponseDTO {
    
    @Email
    @JsonProperty("email_novo")
    private String newEmail;

    @Email
    @JsonProperty("email_antigo")
    private String oldEmail;

    @NotNull
    @NotBlank
    @JsonProperty("role")
    private String role;
    
}
