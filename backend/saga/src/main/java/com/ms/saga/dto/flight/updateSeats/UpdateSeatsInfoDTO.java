package com.ms.saga.dto.flight.updateSeats;

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
public class UpdateSeatsInfoDTO {

    @JsonProperty("quantidade_poltronas")
    private Integer seatsQuantity;

    @JsonProperty("valor")
    private BigDecimal value;

    @JsonProperty("milhas_utilizadas")
    private Integer milesUsed;

}
