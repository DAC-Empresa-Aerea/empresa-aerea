package com.ms.flight.dto.flightStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlightStatusRequestDTO {
    private String flightCode;
    private String statusCode;
}
