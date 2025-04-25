package com.ms.saga.dto.flight.updateSeats;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UpdateSeatsResponse {

    @JsonProperty("codigo_voo")
    private String flightCode;

    @JsonProperty("quantidade_poltronas")
    private Integer seatsQuantity;

    @JsonProperty("codigo_aerporto_origem")
    private String originAirportCode;

    @JsonProperty("codigo_aerporto_destino")
    private String destinyAirportCode;

}
