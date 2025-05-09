package com.ms.customer.dto.updateMiles;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UpdateMilesResponseDTO {
    
    @JsonProperty("codigo")
    private Long code;
    
    @JsonProperty("saldo_milhas")
    private Integer milesBalance;
    
}
