package com.ms.saga.dto.flight;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class FlightRequestDTO {
    private OffsetDateTime data;  
    private BigDecimal valorPassagem;
    private Integer quantidadePoltronasTotal;
    private Integer quantidadePoltronasOcupadas;
    private String codigoAeroportoOrigem;
    private String codigoAeroportoDestino;
}
