package com.ms.customer.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CheckMileResponseDTO {

    @JsonProperty("codigo")
    private Long code;

    @JsonProperty("saldo_milhas")
    private Integer milesBalance;

    @JsonProperty("transacoes")
    private List<TransitionDTO> transactions;
}
