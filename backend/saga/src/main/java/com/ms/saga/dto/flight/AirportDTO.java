package com.ms.saga.dto.flight;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AirportDTO {

    @JsonProperty("codigo")
    private String code;

    @JsonProperty("nome")
    private String name;

    @JsonProperty("cidade")
    private String city;

    @JsonProperty("uf")
    private String uf;
}