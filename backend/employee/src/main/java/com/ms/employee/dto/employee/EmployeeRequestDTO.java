package com.ms.employee.dto.employee;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeRequestDTO {
    
    @NotNull(message = "CPF é obrigatório")
    @JsonProperty("cpf")
    private String cpf;

    @NotNull(message = "Email é obrigatório")
    @JsonProperty("email")
    private String email;

    @NotNull(message = "Nome é obrigatório")
    @JsonProperty("nome")
    private String name;

    @NotNull(message = "Telefone é obrigatório")
    @JsonProperty("telefone")
    private String phoneNumber;

    @NotNull(message = "Senha é obrigatória")
    @Min(value = 4, message = "Senha deve ter no mínimo 4 caracteres")
    @Max(value = 4, message = "Senha deve ter no máximo 4 caracteres")
    @JsonProperty("senha") 
    private String password;
    
}
