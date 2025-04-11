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
public class CustomerRequestDTO {
    private String cpf;
    private String email;
    private String nome;
    private BigDecimal saldoMilhas;
    private AddressDTO endereco;
}