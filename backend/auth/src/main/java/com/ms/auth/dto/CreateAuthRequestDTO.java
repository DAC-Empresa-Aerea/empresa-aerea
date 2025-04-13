package com.ms.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CreateAuthRequestDTO {
    @Email(message = "Email precisa ser válido")
    @NotBlank(message = "Email não pode ser vazio")
    private String email;

    @NotBlank(message = "Role não pode ser vazio")
    private String role;
}
