package com.ms.saga.dto.customer.debitSeat;

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
public class DebitSeatResponseDTO {
    
    @JsonProperty("codigo_cliente")
    private Long customerCode;

    @JsonProperty("codigo_reserva")
    private String reserveCode;

    @JsonProperty("milhas_utilizadas")
    private Integer milesUsed;

    @JsonProperty("valor_reais")
    private BigDecimal value;

    @JsonProperty("quantidade_poltronas")
    private Integer seatsQuantity;

    @JsonProperty("codigo_aeroporto_origem")
    private String originAirportCode;

    @JsonProperty("codigo_aeroporto_destino")
    private String destinyAirportCode;

}
