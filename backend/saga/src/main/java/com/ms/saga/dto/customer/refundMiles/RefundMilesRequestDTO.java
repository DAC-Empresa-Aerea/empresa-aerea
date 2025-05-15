package com.ms.saga.dto.customer.refundMiles;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RefundMilesRequestDTO {
    
    private Long customerCode;
    private String reserverCode;
    private int amount;
    private String resonRefund;

}
