package com.ms.saga.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.ms.saga.dto.error.ErrorDTO;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorDTO> handleBusinessException(BusinessException ex) {
        ErrorDTO error = new ErrorDTO(ex.getCode(), ex.getMessage(), ex.getStatus());
        return new ResponseEntity<>(error, HttpStatus.valueOf(ex.getStatus()));
    }

    @ExceptionHandler(ResourceConflictException.class)
    public ResponseEntity<ErrorDTO> handleConflict(ResourceConflictException ex) {
        ErrorDTO error = new ErrorDTO(ex.getCode(), ex.getMessage(), HttpStatus.CONFLICT.value());
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorDTO> handleNotFound(NotFoundException ex) {
        ErrorDTO error = new ErrorDTO(ex.getCode(), ex.getMessage(), HttpStatus.NOT_FOUND.value());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
     
}
