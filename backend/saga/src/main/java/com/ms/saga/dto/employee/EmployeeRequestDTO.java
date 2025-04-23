package com.ms.saga.dto.employee;

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
public class EmployeeRequestDTO {

    private String cpf;

    private String email;

    private String nome;
    
    private String telefone;

}
