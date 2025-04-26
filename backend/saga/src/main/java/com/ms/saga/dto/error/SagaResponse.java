package com.ms.saga.dto.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SagaResponse<T> {
    private boolean success;
    private T data;
    private ErrorDTO error;

    public static <T> SagaResponse<T> success(T data) {
        return new SagaResponse<>(true, data, null);
    }

    public static <T> SagaResponse<T> error(ErrorDTO error) {
        return new SagaResponse<>(false, null, error);
    }

    public static <T> SagaResponse<T> error(String code, String message) {
        return new SagaResponse<>(false, null, new ErrorDTO(code, message));
    }
}

