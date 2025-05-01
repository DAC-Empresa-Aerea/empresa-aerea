package com.ms.customer.dto.updateMiles;

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
public class UpdateMilesRequestDTO {

    @JsonProperty("quantidade")
    @NotNull(message = "A quantidade não pode ser nula")
    @Min(value = 0, message = "A quantidade não pode ser negativa")
    private Integer quantity;

}
