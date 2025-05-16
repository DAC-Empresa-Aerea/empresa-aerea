package com.ms.flight.dto.flight;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ms.flight.dto.airport.AirportResponseDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FlightWithAirportResponseDTO {

    private String codigo;

    private OffsetDateTime data;
    
    @JsonProperty("valor_passagem")
    private BigDecimal valorPassagem;

    @JsonProperty("quantidade_poltronas_total")
    private Integer quantidadePoltronasTotal;

    @JsonProperty("quantidade_poltronas_ocupadas")
    private Integer quantidadePoltronasOcupadas;

    private String estado;
    
    @JsonProperty("aeroporto_origem")
    private AirportResponseDTO aeroportoOrigem;

    @JsonProperty("aeroporto_destino")
    private AirportResponseDTO aeroportoDestino;
}
