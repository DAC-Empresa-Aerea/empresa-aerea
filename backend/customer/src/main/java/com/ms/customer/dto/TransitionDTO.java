package com.ms.customer.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TransitionDTO {

    private LocalDateTime data;

    @JsonProperty("valor_reais")
    private BigDecimal valorReais;

    @JsonProperty("quantidade_milhas")
    private Integer quantidadeMilhas;

    private String descricao;

    @JsonProperty("codigo_reserva")
    private String codigoReserva;

    private String tipo;

    public TransitionDTO() {
    }

    public TransitionDTO(LocalDateTime data, BigDecimal valorReais, Integer quantidadeMilhas, String descricao, String codigoReserva, String tipo) {
        this.data = data;
        this.valorReais = valorReais;
        this.quantidadeMilhas = quantidadeMilhas;
        this.descricao = descricao;
        this.codigoReserva = codigoReserva;
        this.tipo = tipo;
    }

    public LocalDateTime getData() {
        return data;
    }

    public void setData(LocalDateTime data) {
        this.data = data;
    }

    public BigDecimal getValorReais() {
        return valorReais;
    }

    public void setValorReais(BigDecimal valorReais) {
        this.valorReais = valorReais;
    }

    public Integer getQuantidadeMilhas() {
        return quantidadeMilhas;
    }

    public void setQuantidadeMilhas(Integer quantidadeMilhas) {
        this.quantidadeMilhas = quantidadeMilhas;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getCodigoReserva() {
        return codigoReserva;
    }

    public void setCodigoReserva(String codigoReserva) {
        this.codigoReserva = codigoReserva;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}
