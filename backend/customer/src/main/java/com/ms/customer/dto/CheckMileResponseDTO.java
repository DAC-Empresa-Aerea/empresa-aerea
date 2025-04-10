package com.ms.customer.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CheckMileResponseDTO {

    private Long codigo;

    @JsonProperty("saldo_milhas")
    private Integer saldoMilhas;

    private List<TransitionDTO> transacoes;

    public CheckMileResponseDTO() {
    }

    public CheckMileResponseDTO(Long codigo, Integer saldoMilhas, List<TransitionDTO> transacoes) {
        this.codigo = codigo;
        this.saldoMilhas = saldoMilhas;
        this.transacoes = transacoes;
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

    public List<TransitionDTO> getTransacoes() {
        return transacoes;
    }

    public void setTransacoes(List<TransitionDTO> transacoes) {
        this.transacoes = transacoes;
    }

}
