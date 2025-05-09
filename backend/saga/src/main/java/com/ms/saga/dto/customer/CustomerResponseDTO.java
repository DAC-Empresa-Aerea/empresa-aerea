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
public class CustomerResponseDTO {

    @JsonProperty("codigo")
    private Long code;

    @JsonProperty("cpf")
    private String cpf;

    @JsonProperty("email")
    private String email;

    @JsonProperty("nome")
    private String name;

    @JsonProperty("saldo_milhas")
    private Integer milesBalance;

    @JsonProperty("endereco")
    private AddressDTO address;
    
}
