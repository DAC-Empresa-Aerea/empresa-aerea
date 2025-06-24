package com.ms.flight.dto.flightStatus;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlightStatusRequestDTO {
    
    @NotBlank
    @NotNull
    @Size(min=8, max=8)
    @JsonProperty("codigo_voo")
    private String flightCode;
    
    @NotBlank
    @NotNull
    @JsonProperty("codigo_status")
    private String statusCode;

}
