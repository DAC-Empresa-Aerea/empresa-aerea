package com.ms.reserve.command.model;

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
public class ReserveCommand {
    
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "estado", referencedColumnName = "codigo", nullable = false)
    private ReserveStatusCommand status;

    @Column(name = "codigo_voo", nullable = false)
    private String flightCode;

}
