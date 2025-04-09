package com.ms.customer.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class HistoricoMilhas {

    @ManyToOne
    @JoinColumn(name = "codigo", nullable = false)
    private Cliente cliente;
    
    @Column(name = "data", nullable = false)
    private LocalDateTime data;

    @Column(name = "valor_reais", nullable = false)
    private Float valor_reais;

    @Column(name = "quantidade_milhas", nullable = false)
    private Integer quantidade_milhas;

    @Column(name = "descricao", nullable = false)
    private String descricao;

    @Column(name = "codigo_reserva", nullable = true)
    private String codigo_reserva;

    @Column(name = "tipo", nullable = false)
    private String tipo;

    public HistoricoMilhas() {
    }

    public HistoricoMilhas(Cliente cliente, LocalDateTime data, Float valor_reais, Integer quantidade_milhas, String descricao, String codigo_reserva, String tipo) {
        this.cliente = cliente;
        this.data = data;
        this.valor_reais = valor_reais;
        this.quantidade_milhas = quantidade_milhas;
        this.descricao = descricao;
        this.codigo_reserva = codigo_reserva;
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
    public Float getValor_reais() {
        return valor_reais;
    }
    public void setValor_reais(Float valor_reais) {
        this.valor_reais = valor_reais;
    }
    public Integer getQuantidade_milhas() {
        return quantidade_milhas;
    }
    public void setQuantidade_milhas(Integer quantidade_milhas) {
        this.quantidade_milhas = quantidade_milhas;
    }
    public String getDescricao() {
        return descricao;
    }
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    public String getCodigo_reserva() {
        return codigo_reserva;
    }
    public void setCodigo_reserva(String codigo_reserva) {
        this.codigo_reserva = codigo_reserva;
    }
    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    
}
