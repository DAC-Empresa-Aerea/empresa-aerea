package com.ms.auth.exception;

import com.ms.auth.dto.error.ErrorDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BusinessException extends RuntimeException {
    
    private final String code;
    private final Integer status;

    public BusinessException(String code, String message, Integer status) {
        super(message);
        this.code = code;
        this.status = status;
    }

    public BusinessException(ErrorDTO error) {
        super(error.getMessage());
        this.code = error.getCode();
        this.status = error.getStatus();
    }	

}
