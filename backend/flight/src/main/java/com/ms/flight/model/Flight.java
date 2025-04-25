package com.ms.flight.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tb_voos")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Flight implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "codigo_voo", nullable = false, unique = true, length = 8)
    private String codigo;

    @NotNull
    @Future
    private LocalDateTime data;

    @NotNull
    @DecimalMin(value = "0.01")
    @Column(scale = 2, nullable = false)
    private BigDecimal valor;

    @NotNull
    @Min(value = 1)
    @Column(nullable = false)
    private Integer poltronasTotais;

    @NotNull
    @Min(value = 0)
    @Column(nullable = false)
    private Integer poltronasOcupadas;

    @ManyToOne(optional = false)
    @JoinColumn(
        name = "codigo_estado_voo",
        nullable = false,
        foreignKey = @ForeignKey(name = "fk_estado_voo")
    )
    private FlightStatus estado;

    @NotNull
    @ManyToOne(optional = false)
    @JoinColumn(
        name = "codigo_origem",
        nullable = false,
        foreignKey = @ForeignKey(name = "fk_voo_origem")
    )
    private Airport origem;

    @NotNull
    @ManyToOne(optional = false)
    @JoinColumn(
        name = "codigo_destino",
        nullable = false,
        foreignKey = @ForeignKey(name = "fk_voo_destino")
    )
    private Airport destino;
}
