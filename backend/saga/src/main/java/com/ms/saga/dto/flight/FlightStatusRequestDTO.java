package com.ms.saga.dto.flight;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class FlightStatusRequestDTO {

    @JsonProperty("estado")
    private String status;
    
}
