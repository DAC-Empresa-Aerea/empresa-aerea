package com.ms.saga.dto.flight;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FlightResponseDTO {

    private String codigo;

    private OffsetDateTime data;
    
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