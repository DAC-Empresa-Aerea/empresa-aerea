package com.ms.saga.dto.reserve.register;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RegisterReserveRequestDTO {
    
    @JsonProperty("codigo_cliente")
    private String codigoCliente;

    private BigDecimal valor;

    @JsonProperty("milhas_utilizadas")
    private Integer milhasUtilizadas;

    @JsonProperty("quantidade_poltronas")
    private Integer quantidadePoltronas;

    @JsonProperty("codigo_voo")
    private String codigoVoo;

    @JsonProperty("codigo_aeroporto_origem")
    private String codigoAeroportoOrigem;

    @JsonProperty("codigo_aeroporto_destino")
    private String codigoAeroportoDestino;
    
}
