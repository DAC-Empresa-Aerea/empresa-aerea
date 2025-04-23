package com.ms.flight.enums;


import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

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

    public String getCodigo() {
        return codigo;
    }

    public String getSigla() {
        return sigla;
    }

    public String getDescricao() {
        return descricao;
    }

    // Lookup por código
    private static final Map<String, FlightStatusEnum> LOOKUP_BY_CODIGO =
        Arrays.stream(values()).collect(Collectors.toUnmodifiableMap(
            FlightStatusEnum::getCodigo,
            Function.identity()
        ));

    public static FlightStatusEnum fromCodigo(String codigo) {
        return LOOKUP_BY_CODIGO.get(codigo);
    }

}
