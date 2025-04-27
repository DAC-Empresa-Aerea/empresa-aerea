package com.ms.customer.dto.debitSeat;

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
    private String customerCode;

    @JsonProperty("milhas_utilizadas")
    private Integer milesUsed;

    @JsonProperty("quantidade_poltronas")
    private Integer seatsQuantity;

    @JsonProperty("codigo_aeroporto_origem")
    private String originAirportCode;

    @JsonProperty("codigo_aeroporto_destino")
    private String destinyAirportCode;

}
