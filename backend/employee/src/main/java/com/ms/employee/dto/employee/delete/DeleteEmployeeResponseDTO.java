package com.ms.employee.dto.employee.delete;

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
public class DeleteEmployeeResponseDTO {

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

}
