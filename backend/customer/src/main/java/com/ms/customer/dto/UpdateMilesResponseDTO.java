package com.ms.customer.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UpdateMilesResponseDTO {
    
    private Long codigo;
    
    @JsonProperty("saldo_milhas")
    private Integer saldoMilhas;

    public UpdateMilesResponseDTO() {
    }

    public UpdateMilesResponseDTO(Long codigo, Integer saldoMilhas) {
        this.codigo = codigo;
        this.saldoMilhas = saldoMilhas;
    }

    public Long getCodigo() {
        return codigo;
    }

    public void setCodigo(Long codigo) {
        this.codigo = codigo;
    }

    public Integer getSaldoMilhas() {
        return saldoMilhas;
    }

    public void setSaldoMilhas(Integer saldoMilhas) {
        this.saldoMilhas = saldoMilhas;
    }
    
}
