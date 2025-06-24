package com.ms.auth.util;

import java.util.stream.Collectors;

import jakarta.validation.ConstraintViolationException;

public class ValidationUtil {

    public static String extractMessages(ConstraintViolationException ex) {
        return ex.getConstraintViolations()
                .stream()
                .map(violation -> {
                    String message = violation.getMessage();
                    return message;
                })
                .collect(Collectors.joining("; "));
    }
}