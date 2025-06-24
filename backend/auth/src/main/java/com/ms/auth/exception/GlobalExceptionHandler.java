package com.ms.auth.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.ms.auth.dto.error.ErrorDTO;
import com.ms.auth.util.ValidationUtil;

import jakarta.validation.ConstraintViolationException;

@ControllerAdvice
public class GlobalExceptionHandler {

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
