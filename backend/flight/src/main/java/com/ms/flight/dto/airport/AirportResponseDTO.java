package com.ms.flight.dto.airport;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AirportResponseDTO {
    private String codigo;
    private String nome;
    private String cidade;
    private String uf;
}
