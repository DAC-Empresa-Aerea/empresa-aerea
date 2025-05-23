package com.ms.reserve.dto.reserve;

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
public class ReserveResponseDTO {

    @JsonProperty("codigo")
    private String code;

    @JsonProperty("data")
    private OffsetDateTime date;

    @JsonProperty("valor")
    private BigDecimal value;

    @JsonProperty("milhas_utilizadas")
    private Integer milesUsed;

    @JsonProperty("quantidade_poltronas")
    private Integer seatsQuantity;

    @JsonProperty("codigo_cliente")
    private Long customerCode;

    @JsonProperty("estado")
    private String status;

    @JsonProperty("codigo_voo")
    private String flightCode;

}