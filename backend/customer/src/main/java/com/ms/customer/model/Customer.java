package com.ms.customer.model;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "cliente")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long code;

    @Column(name = "cpf", nullable = false, unique = true)
    private String cpf;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String name;

    @Column(name = "saldo_milhas", nullable = false)
    @Min(value = 0, message = "O saldo de milhas não pode ser menor que zero")
    private Integer milesBalance;

    @Embedded
    @NotNull(message = "Endereço é obrigatório")
    @Valid
    private Address address;

}