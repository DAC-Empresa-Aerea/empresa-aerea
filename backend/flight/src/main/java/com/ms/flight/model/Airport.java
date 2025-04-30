package com.ms.flight.model;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
    name = "tb_aeroportos",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"nome", "cidade", "UF"})
    }
)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Airport implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Column(nullable = false, length = 3, unique = true)
    private String codigo;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String cidade;

    @Column(nullable = false, length = 2)
    private String UF;
}
