package com.ms.customer.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TransitionDTO {

    @JsonProperty("data")
    private OffsetDateTime date;

    @JsonProperty("valor_reais")
    private BigDecimal amountInReais;

    @JsonProperty("quantidade_milhas")
    private Integer milesQuantity;

    @JsonProperty("descricao")
    private String description;

    @JsonProperty("codigo_reserva")
    private String reserveCode;

    @JsonProperty("tipo")
    private String type;

}
