package com.ms.flight.exception;

public class AirportNotRegisteredException extends RuntimeException {
    private final String code;

    public AirportNotRegisteredException(String message) {
        super(message);
        this.code = "AEROPORTO_NAO_CADASTRADO";
    }

    public String getCode() {
        return code;
    }
}
