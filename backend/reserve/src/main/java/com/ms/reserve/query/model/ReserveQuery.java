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
    @Column(name = "codigo", nullable = false)
    private String code;

    @Column(name = "data", nullable = false)
    private LocalDateTime date;

    @Column(name = "valor", nullable = false)
    private BigDecimal value;

    @Column(name = "milhas_utilizadas", nullable = false)
    private Integer milesUsed;

    @Column(name = "quantidade_poltronas", nullable = false)
    private Integer seatsQuantity;

    @Column(name = "codigo_cliente", nullable = false)
    private Long customerCode;

    @Column(name = "estado_codigo", nullable = false)
    private String statusCode;

    @Column(name = "estado_sigla", nullable = false)
    private String statusAbbreviation;

    @Column(name = "estado_descricao", nullable = false)
    private String statusDescription;

    @Column(name = "codigo_voo", nullable = false)
    private String flightCode;

}
