package com.ms.reserve.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

import com.ms.reserve.dto.error.ErrorDTO;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorDTO> handleBusinessException(BusinessException ex) {
        ErrorDTO error = new ErrorDTO(ex.getCode(), ex.getMessage(), ex.getStatus());
        return new ResponseEntity<>(error, HttpStatus.valueOf(ex.getStatus()));
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ErrorDTO> handleResponseStatusException(ResponseStatusException ex) {
        ErrorDTO error = new ErrorDTO("BAD_REQUEST", ex.getReason(), HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

}

