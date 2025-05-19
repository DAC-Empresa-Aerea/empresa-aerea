package com.ms.customer.dto.error;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ErrorDTO {
    private String code;
    @JsonProperty("erro")
    private String message;
    private Integer status;
}
