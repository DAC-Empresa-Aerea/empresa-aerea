package com.ms.saga.exception;

public class ServiceUnavailableException extends RuntimeException {
    private final String code;

    public ServiceUnavailableException(String code, String message) {
        super(message);
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
