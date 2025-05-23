package com.ms.saga.dto.auth.delete;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DeleteAuthRequestDTO {
    private String email;
    private String role;
}
