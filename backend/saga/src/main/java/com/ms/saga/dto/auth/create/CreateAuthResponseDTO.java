package com.ms.saga.dto.auth.create;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CreateAuthResponseDTO {
    private String accessToken;
    private String tokenType;
    private String tipo;
    private boolean created;
}
