package com.ms.saga.dto.customer;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CustomerResponseDTO {
    private Long codigo;
    private String cpf;
    private String email;
    private String nome;
    private BigDecimal saldoMilhas;
    private AddressDTO endereco;

    private boolean created;
}
