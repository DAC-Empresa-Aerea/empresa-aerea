package com.ms.customer.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AddressDTO {

    @NotBlank(message = "CEP é obrigatório")
    @Pattern(regexp = "\\d{8}", message = "CEP deve conter exatamente 8 dígitos numéricos, sem traço")
    @JsonProperty("cep")
    private String cep;

    @NotBlank(message = "UF é obrigatória")
    @Pattern(regexp = "[A-Z]{2}", message = "UF deve conter exatamente 2 letras maiúsculas")
    @JsonProperty("uf")
    private String uf;

    @NotBlank(message = "Cidade é obrigatória")
    @JsonProperty("cidade")
    private String city;

    @NotBlank(message = "Bairro é obrigatório")
    @JsonProperty("bairro")
    private String district;

    @NotBlank(message = "Rua é obrigatória")
    @JsonProperty("rua")
    private String street;

    @NotBlank(message = "Número é obrigatório")
    @JsonProperty("numero")
    private String number;

    @JsonProperty("complemento")
    private String complement;
}