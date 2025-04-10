package com.ms.customer.dto;

public class UpdateMilesRequestDTO {

    private Integer quantidade;

    public UpdateMilesRequestDTO() {
    }

    public UpdateMilesRequestDTO(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }
    
}
