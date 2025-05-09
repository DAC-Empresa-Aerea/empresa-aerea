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
public class AddressDTO {

    @JsonProperty("cep")
    private String cep;

    @JsonProperty("uf")
    private String uf;

    @JsonProperty("cidade")
    private String city;

    @JsonProperty("bairro")
    private String district;

    @JsonProperty("rua")
    private String street;

    @JsonProperty("numero")
    private String number;

    @JsonProperty("complemento")
    private String complement;
    
}
