package com.ms.saga.dto.customer;

import com.fasterxml.jackson.annotation.JsonProperty;

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
    @JsonProperty("saldo_milhas")
    private Integer saldoMilhas;
    private AddressDTO endereco;
}