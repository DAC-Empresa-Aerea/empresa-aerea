package com.ms.employee.dto.employee;

import org.hibernate.validator.constraints.br.CPF;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
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
    @CPF(message = "CPF inválido")
    private String cpf;

    @NotNull(message = "Email é obrigatório")
    @JsonProperty("email")
    @Email(message = "Email inválido")
    private String email;

    @NotNull(message = "Nome é obrigatório")
    @JsonProperty("nome")
    private String name;

    @NotNull(message = "Telefone é obrigatório")
    @Pattern(regexp = "\\d+", message = "Telefone deve conter apenas números")
    @JsonProperty("telefone")
    private String phoneNumber;
    
}
