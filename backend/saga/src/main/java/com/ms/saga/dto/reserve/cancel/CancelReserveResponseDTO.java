package com.ms.saga.dto.reserve.cancel;

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
public class CancelReserveResponseDTO {
        
        private String codigo;
        
        private LocalDateTime data;
        
        private BigDecimal valor;
        
        @JsonProperty("milhas_utilizadas")
        private Integer milhasUtilizadas;

        @JsonProperty("quantidade_poltronas")
        private Integer quantidadePoltronas;

        @JsonProperty("codigo_cliente")
        private String codigoCliente;

        private String estado;

        @JsonProperty("codigo_voo")
        private String codigoVoo;

        @JsonProperty("codigo_aeroporto_origem")
        private String codigoAeroportoOrigem;

        @JsonProperty("codigo_aeroporto_destino")
        private String codigoAeroportoDestino;
    
}
