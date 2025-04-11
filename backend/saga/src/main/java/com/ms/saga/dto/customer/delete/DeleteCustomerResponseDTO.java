package com.ms.saga.dto.customer.delete;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DeleteCustomerResponseDTO {
    private String correlationId;
    private boolean deleted;
}
