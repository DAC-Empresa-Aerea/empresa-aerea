package com.ms.flight.dto.flight;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FlightResponseDTO {

    private String codigo;

    private LocalDateTime data;
    
    @JsonProperty("valor_passagem")
    private BigDecimal valorPassagem;

    @JsonProperty("quantidade_poltronas_total")
    private Integer quantidadePoltronasTotal;

    @JsonProperty("quantidade_poltronas_ocupadas")
    private Integer quantidadePoltronasOcupadas;

    private String estado;
    
    @JsonProperty("codigo_aeroporto_origem")
    private String codigoAeroportoOrigem;

    @JsonProperty("codigo_aeroporto_destino")
    private String codigoAeroportoDestino;

}