package com.ms.reserve.dto.cqrs;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UpdateStatusDTO {
    
    @JsonProperty("codigo_reserva")
    private String reserveCode;
    
    @JsonProperty("estado")
    private String status;

}
