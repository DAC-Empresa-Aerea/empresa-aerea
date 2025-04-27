package com.ms.customer.dto.debitSeat;

import com.fasterxml.jackson.annotation.JsonProperty;

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
public class DebitSeatRequestDTO {
    
    @JsonProperty("codigo_cliente")
    @NotNull(message = "O código do cliente não pode ser nulo")
    private String customerCode;

    @JsonProperty("milhas_utilizadas")
    @NotNull(message = "As milhas utilizadas não podem ser nulas")
    @Min(value = 0, message = "As milhas utilizadas não podem ser negativas")
    private Integer milesUsed;

    @JsonProperty("quantidade_poltronas")
    @NotNull(message = "A quantidade de poltronas não pode ser nula")
    @Min(value = 1, message = "A quantidade de poltronas deve ser maior que zero")
    private Integer seatsQuantity;

    @JsonProperty("codigo_aeroporto_origem")
    @NotNull(message = "O código do aeroporto de origem não pode ser nulo")
    private String originAirportCode;

    @JsonProperty("codigo_aeroporto_destino")
    @NotNull(message = "O código do aeroporto de destino não pode ser nulo")
    private String destinyAirportCode;

}
