package com.ms.saga.dto.customer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class GetMilesResponseDTO {
    
    private Long customerCode;
    
    private Integer milesBalance;

}
