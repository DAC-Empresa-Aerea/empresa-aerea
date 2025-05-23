package com.ms.saga.dto.reserve.register;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RegisterReserveRequestDTO {

    @JsonProperty("codigo_cliente")
    private Long customerCode;

    @JsonProperty("valor")
    private BigDecimal value;

    @JsonProperty("milhas_utilizadas")
    private Integer milesUsed;

    @JsonProperty("codigo_voo")
    private String flightCode;

    @JsonProperty("quantidade_poltronas")
    private Integer seatsQuantity;
    
}
