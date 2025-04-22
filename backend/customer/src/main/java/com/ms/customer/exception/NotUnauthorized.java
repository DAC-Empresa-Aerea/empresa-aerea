package com.ms.customer.exception;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class NotUnauthorized extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public NotUnauthorized(String message) {
        super(message);
    }

    public NotUnauthorized(String message, Throwable cause) {
        super(message, cause);
    }

}
