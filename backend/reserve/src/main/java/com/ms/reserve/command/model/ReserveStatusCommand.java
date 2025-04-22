package com.ms.reserve.command.model;

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
    private String codigo;
    
    private String sigla;

    private String descricao;
}
