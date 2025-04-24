package com.ms.employee.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class EmployeeResponseDTO {

    @JsonProperty("codigo")
    private Long id;

    private String cpf;

    private String email;

    private String nome;
    
    private String telefone;

}
