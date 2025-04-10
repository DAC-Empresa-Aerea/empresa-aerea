package com.ms.customer.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

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

    private LocalDateTime data;

    @JsonProperty("valor_reais")
    private BigDecimal valorReais;

    @JsonProperty("quantidade_milhas")
    private Integer quantidadeMilhas;

    private String descricao;

    @JsonProperty("codigo_reserva")
    private String codigoReserva;

    private String tipo;
}
