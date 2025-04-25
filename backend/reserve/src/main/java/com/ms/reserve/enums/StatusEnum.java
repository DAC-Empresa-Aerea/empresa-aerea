package com.ms.reserve.enums;

import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import lombok.Getter;

@Getter
public enum StatusEnum {

    CRIADA("CRIADA", "CRI", "Reserva criada"),
    CHECK_IN("CHECK-IN", "CKI", "Check-in realizado"),
    EMBARCADA("EMBARCADA", "EMB", "Passageiro embarcado"),
    REALIZADA("REALIZADA", "REA", "Reserva realizada"),
    CANCELADA("CANCELADA", "CAN", "Reserva cancelada"),
    CANCELADA_VOO("CANCELADA_VOO", "CAV", "Reserva cancelada por voo"),
    NAO_REALIZADA("NAO_REALIZADA", "NRE", "Não realizada");

    private final String codigo;
    private final String sigla;
    private final String descricao;

    StatusEnum(String codigo, String sigla, String descricao) {
        this.codigo = codigo;
        this.sigla = sigla;
        this.descricao = descricao;
    }

    public static boolean canTransfer(StatusEnum origin, StatusEnum destiny) {
        return switch (origin) {
            case CRIADA -> destiny == CHECK_IN || destiny == CANCELADA || destiny == CANCELADA_VOO || destiny == NAO_REALIZADA;
            case CHECK_IN -> destiny == EMBARCADA || destiny == CANCELADA_VOO;
            case EMBARCADA -> destiny == REALIZADA || destiny == CANCELADA_VOO;
            default -> false;
        };
    }
    
    private static final Map<String, StatusEnum> LOOKUP_BY_CODE =
        Arrays.stream(values()).collect(Collectors.toUnmodifiableMap(
            StatusEnum::getCodigo,
            Function.identity()
        ));

    public static StatusEnum fromCode(String code) {
        return LOOKUP_BY_CODE.get(code);
    }

}
