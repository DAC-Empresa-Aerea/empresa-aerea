package com.ms.reserve.command.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "historico_reservas")
public class ReserveHistoryCommand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "codigo_reserva", referencedColumnName = "codigo", nullable = false)
    private ReserveCommand reserve;

    @Column(name = "data", nullable = false)
    private LocalDateTime date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "estado_origem", referencedColumnName = "codigo", nullable = false)
    private ReserveStatusCommand originStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "estado_destino", referencedColumnName = "codigo", nullable = false)
    private ReserveStatusCommand destinyStatus;

}
