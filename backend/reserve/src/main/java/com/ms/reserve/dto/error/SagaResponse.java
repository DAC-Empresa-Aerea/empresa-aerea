package com.ms.reserve.dto.error;

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
}

