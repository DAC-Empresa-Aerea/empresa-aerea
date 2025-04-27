package com.ms.saga.dto.flight;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlightStatusDTO {
    private String flightCode;
    private String statusCode;
}
