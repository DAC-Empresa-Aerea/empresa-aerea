package com.ms.reserve.query.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "reservas")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReserveQuery {
    @Id
    private String codigo;

    @Column(nullable = false)
    private LocalDateTime data;

    @Column(nullable = false)
    private BigDecimal valor;

    @Column(name = "milhas_utilizadas", nullable = false)
    private Integer milhasUtilizadas;

    @Column(name = "codigo_cliente", nullable = false)
    private Long codigoCliente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "estado", referencedColumnName = "codigo", nullable = false)
    private ReserveStatusQuery estado;

    @Column(name = "codigo_voo", nullable = false)
    private String codigoVoo;

    @Column(name = "codigo_aeroporto_origem", nullable = false)
    private String codigoAeroportoOrigem;

    @Column(name = "codigo_aeroporto_destino", nullable = false)
    private String codigoAeroportoDestino;

}
