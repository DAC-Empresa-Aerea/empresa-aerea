package com.ms.reserve.dto.reserve.cancel;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class ReserveCancelRequestDTO {
    
    @JsonProperty("reservaId")
    private String reservaId;

}

