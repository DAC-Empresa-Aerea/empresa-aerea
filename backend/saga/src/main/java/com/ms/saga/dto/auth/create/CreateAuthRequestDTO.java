package com.ms.saga.dto.auth.create;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CreateAuthRequestDTO {
    private String email;
    private String password;
    private String role;
}
