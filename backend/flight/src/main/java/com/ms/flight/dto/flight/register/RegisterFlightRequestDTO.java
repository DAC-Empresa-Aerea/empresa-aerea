package com.ms.flight.dto.flight.register;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RegisterFlightRequestDTO {
    
    @Future(message = "A data deve estar no futuro")
    private OffsetDateTime data;

    @JsonProperty("valor_passagem")
    @NotNull(message = "O valor da passagem não pode ser nulo")
    @Min(value = 0, message = "O valor da passagem deve ser maior ou igual a 0")
    private BigDecimal valorPassagem;

    @JsonProperty("quantidade_poltronas_total")
    @Min(value = 1, message = "A quantidade de poltronas deve ser maior que 0")
    @NotNull(message = "A quantidade de poltronas não pode ser nula")
    private Integer quantidadePoltronasTotal;

    @JsonProperty("quantidade_poltronas_ocupadas")
    @Min(value = 0, message = "A quantidade de poltronas ocupadas deve ser maior ou igual a 0")
    private Integer quantidadePoltronasOcupadas;

    @JsonProperty("codigo_aeroporto_origem")
    @NotNull(message = "O código do aeroporto de origem não pode ser nulo")
    private String codigoAeroportoOrigem;

    @JsonProperty("codigo_aeroporto_destino")
    @NotNull(message = "O código do aeroporto de destino não pode ser nulo")
    private String codigoAeroportoDestino;

}