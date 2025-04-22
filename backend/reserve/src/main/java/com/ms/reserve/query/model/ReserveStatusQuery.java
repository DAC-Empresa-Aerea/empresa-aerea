package com.ms.reserve.query.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "reserve_status")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReserveStatusQuery {
    @Id
    private String codigo;
    
    @Column(nullable = false, unique = true)
    private String sigla;

    @Column(nullable = false, unique = true)
    private String descricao;
}
