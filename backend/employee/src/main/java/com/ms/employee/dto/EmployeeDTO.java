package com.ms.employee.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDTO {

    //#region Atributos
    private Long id;
    private String cpf;
    private String email;
    private String nome;
    private String telefone;
    //#endregion

}
