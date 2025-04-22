package com.ms.reserve.dto.status;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class StatusDTO {
    @NotNull(message = "O status não pode ser nulo")
    private String status;
}
