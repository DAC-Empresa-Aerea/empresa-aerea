package com.ms.reserve.query.model;

import java.time.LocalDateTime;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "historico_reservas")
public class ReserveHistoryQuery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo_reserva", nullable = false)
    private String codigoReserva;

    @Column(nullable = false)
    private LocalDateTime data;

    @Column(name = "estado_origem_codigo", nullable = false)
    private String estadoOrigemCodigo;

    @Column(name = "estado_origem_sigla", nullable = false)
    private String estadoOrigemSigla;

    @Column(name = "estado_origem_descricao", nullable = false)
    private String estadoOrigemDescricao;

    @Column(name = "estado_destino_codigo", nullable = false)
    private String estadoDestinoCodigo;

    @Column(name = "estado_destino_sigla", nullable = false)
    private String estadoDestinoSigla;

    @Column(name = "estado_destino_descricao", nullable = false)
    private String estadoDestinoDescricao;
}

