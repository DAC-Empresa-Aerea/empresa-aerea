package com.ms.saga.dto.employee.update;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UpdateEmployeeResponseDTO {
    
    @JsonProperty("codigo")
    private Long id;

    @JsonProperty("cpf")
    private String cpf;

    @JsonProperty("email")
    private String email;

    @JsonProperty("nome")
    private String name;
    
    @JsonProperty("telefone")
    private String phoneNumber;
    
    @JsonProperty("email_antigo")
    private String oldEmail;

}
