package com.ms.saga.exception;

public class ResourceConflictException extends RuntimeException {
    private final String code;

    public ResourceConflictException(String code, String message) {
        super(message);
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}

