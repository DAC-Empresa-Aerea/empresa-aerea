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
public class UpdateSeatsResponseDTO {

    @JsonProperty("voo")
    private FlightWithAirportResponseDTO flight;

    @JsonProperty("informacao")
    private UpdateSeatsInfoDTO info;

}

