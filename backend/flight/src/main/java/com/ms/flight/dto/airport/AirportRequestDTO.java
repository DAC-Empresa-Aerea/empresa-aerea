package com.ms.flight.dto.airport;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AirportRequestDTO {
    private String codigo;
    private String nome;
    private String cidade;
    private String UF;
}
