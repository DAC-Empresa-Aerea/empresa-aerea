package com.ms.reserve.command.model;

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
public class ReserveStatusCommand {

    @Id
    @Column(name = "codigo", nullable = false)
    private String code;
    
    @Column(name = "sigla", nullable = false)
    private String abbreviation;

    @Column(name = "descricao", nullable = false)
    private String description;
    
}
