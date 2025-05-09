package com.ms.saga.dto.auth.update;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UpdateAuthDTO {
    
    @JsonProperty("email_novo")
    private String newEmail;

    @JsonProperty("email_antigo")
    private String oldEmail;

    @JsonProperty("role")
    private String role;
    
}
