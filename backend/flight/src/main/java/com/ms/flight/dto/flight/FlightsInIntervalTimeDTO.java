package com.ms.flight.dto.flight;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FlightsInIntervalTimeDTO {

    @JsonProperty("inicio")
    private LocalDate startDate;
    
    @JsonProperty("fim")
    private LocalDate endDate;

    @JsonProperty("voos")
    private List<FlightWithAirportResponseDTO> flights;

}