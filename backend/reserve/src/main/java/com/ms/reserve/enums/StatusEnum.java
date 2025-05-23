package com.ms.reserve.enums;

import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import lombok.Getter;

@Getter
public enum StatusEnum {

    CREATED("CRIADA", "CON", "Reserva criada"),
    CHECK_IN("CHECK-IN", "CKI", "Check-in realizado"),
    BOARDED("EMBARCADA", "EMB", "Passageiro embarcado"),
    FINISHED("REALIZADA", "REA", "Reserva realizada"),
    CANCELED("CANCELADA", "CAN", "Reserva cancelada"),
    FLIGHT_CANCELED("CANCELADA VOO", "CAV", "Reserva cancelada por voo"),
    NOT_FINISHED("NAO_REALIZADA", "NRE", "Não realizada");

    private final String code;
    private final String abbreviation;
    private final String description;

    StatusEnum(String code, String abbreviation, String description) {
        this.code = code;
        this.abbreviation = abbreviation;
        this.description = description;
    }

    public static boolean canTransfer(StatusEnum origin, StatusEnum destiny) {
        return switch (origin) {
            case CREATED -> destiny == CHECK_IN || destiny == CANCELED || destiny == FLIGHT_CANCELED || destiny == NOT_FINISHED;
            case CHECK_IN -> destiny == BOARDED || destiny == FLIGHT_CANCELED;
            case BOARDED -> destiny == FINISHED || destiny == FLIGHT_CANCELED;
            default -> false;
        };
    }
    
    private static final Map<String, StatusEnum> LOOKUP_BY_CODE =
        Arrays.stream(values()).collect(Collectors.toUnmodifiableMap(
            StatusEnum::getCode,
            Function.identity()
        ));

    public static StatusEnum fromCode(String code) {
        return LOOKUP_BY_CODE.get(code);
    }

}
