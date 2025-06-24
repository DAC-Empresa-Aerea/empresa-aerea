package com.ms.auth.dto.update;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UpdateAuthRequestDTO {
    
    @Email
    @JsonProperty("email_novo")
    private String newEmail;

    @Email
    @JsonProperty("email_antigo")
    private String oldEmail;

    @Size(min = 4, max = 4)
    @JsonProperty("senha")
    private String password;

    @NotNull
    @NotBlank
    @JsonProperty("role")
    private String role;
    
}
