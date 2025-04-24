package com.ms.flight.dto.flight;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FlightByAirportDTO {
    
    private LocalDateTime data;

    private String origem;

    private String destino;

    private List<FlightWithAirportResponseDTO> voos;

}
