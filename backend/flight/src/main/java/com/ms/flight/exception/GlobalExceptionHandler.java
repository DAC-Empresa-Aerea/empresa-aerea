package com.ms.flight.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.ms.flight.dto.error.ErrorDTO;
import com.ms.flight.util.ValidationUtil;

import jakarta.validation.ConstraintViolationException;

@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(AirportNotRegisteredException.class)
    public ResponseEntity<ErrorDTO> handleAirportNotRegistered(AirportNotRegisteredException ex) {
        ErrorDTO error = new ErrorDTO(ex.getCode(), ex.getMessage(), HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgument(IllegalArgumentException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("erro", ex.getMessage());
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorDTO> handleBusinessException(BusinessException ex) {
        ErrorDTO error = new ErrorDTO(ex.getCode(), ex.getMessage(), ex.getStatus());
        return new ResponseEntity<>(error, HttpStatus.valueOf(ex.getStatus()));
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorDTO> handleValidationException(ConstraintViolationException ex) {
        String errors = ValidationUtil.extractMessages(ex);

        ErrorDTO error = new ErrorDTO("VALIDATION_ERROR", errors, HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<>(error, HttpStatus.valueOf(error.getStatus()));
    }

}

