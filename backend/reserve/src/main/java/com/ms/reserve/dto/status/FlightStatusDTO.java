package com.ms.reserve.dto.status;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlightStatusDTO {

    @JsonProperty("codigo_voo")
    private String flightCode;
    
    @JsonProperty("codigo_status")
    private String statusCode;
    
}
