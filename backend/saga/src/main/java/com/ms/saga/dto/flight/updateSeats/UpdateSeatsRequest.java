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
public class UpdateSeatsRequest {
    
    @JsonProperty("codigo_voo")
    private String flightCode;

    @JsonProperty("quantidade_poltronas")
    private Integer seatsQuantity;

}
