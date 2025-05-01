package com.ms.flight.enums;

import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import lombok.Getter;

@Getter
public enum FlightStatusEnum {

    CONFIRMADO("CONFIRMADO", "CON", "Voo confirmado"),
    REALIZADO("REALIZADO", "REA", "Voo realizado"),
    CANCELADO("CANCELADO", "CAN", "Voo cancelada");

    private final String codigo;
    private final String sigla;
    private final String descricao;

    FlightStatusEnum(String codigo, String sigla, String descricao) {
        this.codigo = codigo;
        this.sigla = sigla;
        this.descricao = descricao;
    }

    private static final Map<String, FlightStatusEnum> LOOKUP_BY_CODE =
        Arrays.stream(values()).collect(Collectors.toUnmodifiableMap(
            FlightStatusEnum::getCodigo,
            Function.identity()
        ));

    public static FlightStatusEnum fromCode(String code) {
        return LOOKUP_BY_CODE.get(code);
    }

}
