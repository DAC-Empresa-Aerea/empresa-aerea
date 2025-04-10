package com.ms.customer.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class HistoricoMilhas {

    @ManyToOne
    @JoinColumn(name = "codigo", nullable = false)
    private Cliente cliente;

    @Id
    @Column(name = "data", nullable = false)
    private LocalDateTime data;

    @Column(name = "valor_reais", nullable = false)
    private BigDecimal valorReais;

    @Column(name = "quantidade_milhas", nullable = false)
    private Integer quantidadeMilhas;

    @Column(name = "descricao", nullable = false)
    private String descricao;

    @Column(name = "codigo_reserva", nullable = true, length = 8)
    private String codigoReserva;

    @Column(name = "tipo", nullable = false)
    private String tipo;

    public HistoricoMilhas() {
    }

    public HistoricoMilhas(Cliente cliente, LocalDateTime data, BigDecimal valor_reais, Integer quantidade_milhas, String descricao, String codigo_reserva, String tipo) {
        this.cliente = cliente;
        this.data = data;
        this.valorReais = valor_reais;
        this.quantidadeMilhas = quantidade_milhas;
        this.descricao = descricao;
        this.codigoReserva = codigo_reserva;
        this.tipo = tipo;
    }

    public Cliente getCodigo() {
        return cliente;
    }
    public void setCodigo(Cliente cliente) {
        this.cliente = cliente;
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
    public void setValorReais(BigDecimal valor_reais) {
        this.valorReais = valor_reais;
    }
    public Integer getQuantidadeMilhas() {
        return quantidadeMilhas;
    }
    public void setQuantidadeMilhas(Integer quantidade_milhas) {
        this.quantidadeMilhas = quantidade_milhas;
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
    public void setCodigoReserva(String codigo_reserva) {
        this.codigoReserva = codigo_reserva;
    }
    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    
}
