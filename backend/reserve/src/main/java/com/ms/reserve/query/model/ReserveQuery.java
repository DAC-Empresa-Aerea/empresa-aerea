package com.ms.reserve.query.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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

    @Column(name = "quantidade_poltronas", nullable = false)
    private Integer quantidadePoltronas;

    @Column(name = "codigo_cliente", nullable = false)
    private Long codigoCliente;

    @Column(name = "estado_codigo", nullable = false)
    private String estadoCodigo;

    @Column(name = "estado_sigla", nullable = false)
    private String estadoSigla;

    @Column(name = "estado_descricao", nullable = false)
    private String estadoDescricao;

    @Column(name = "codigo_voo", nullable = false)
    private String codigoVoo;
}
