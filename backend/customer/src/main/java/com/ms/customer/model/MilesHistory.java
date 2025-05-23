package com.ms.customer.model;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "historico_milhas")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MilesHistory {

    @ManyToOne
    @JoinColumn(name = "codigo", nullable = false)
    private Customer customer;

    @Id
    @Column(name = "data", nullable = false)
    private OffsetDateTime date;

    @Column(name = "valor_reais", nullable = false)
    private BigDecimal amountInReais;

    @Column(name = "quantidade_milhas", nullable = false)
    private Integer milesQuantity;

    @Column(name = "descricao", nullable = false)
    private String description;

    @Column(name = "codigo_reserva", nullable = true, length = 8)
    private String reserveCode;

    @Column(name = "tipo", nullable = false)
    private String type;
    
}
