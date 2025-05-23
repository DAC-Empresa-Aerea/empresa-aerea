package com.ms.saga.dto.flight.updateSeats;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ms.saga.dto.flight.AirportDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FlightWithAirportResponseDTO {

    @JsonProperty("codigo")
    private String code;

    @JsonProperty("data")
    private OffsetDateTime date;
    
    @JsonProperty("valor_passagem")
    private BigDecimal value;

    @JsonProperty("quantidade_poltronas_total")
    private Integer totalSeatCount;

    @JsonProperty("quantidade_poltronas_ocupadas")
    private Integer occupiedSeatsCount;

    @JsonProperty("estado")
    private String status;
    
    @JsonProperty("aeroporto_origem")
    private AirportDTO originAirport;

    @JsonProperty("aeroporto_destino")
    private AirportDTO destinyAirport;
}
