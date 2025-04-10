package com.ms.customer.dto.customer;

import java.math.BigDecimal;

import org.hibernate.validator.constraints.br.CPF;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ms.customer.dto.AddressDTO;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CustomerRequestDTO {
    @NotBlank(message = "CPF é obrigatório")
    @CPF(message = "CPF inválido")
    private String cpf;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    private String email;

    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    @NotNull(message = "Saldo de milhas é obrigatório")
    @Min(value = 0, message = "Saldo de milhas não pode ser negativo")
    @JsonProperty("saldo_milhas")
    private Integer saldoMilhas;

    @NotNull(message = "Endereço é obrigatório")
    @Valid
    private AddressDTO endereco;
}
