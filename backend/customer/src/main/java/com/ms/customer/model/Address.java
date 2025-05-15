package com.ms.customer.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Address {
    @Column(name = "cep", nullable = false)
    private String cep;

    @Column(name = "uf", nullable = false)
    private String uf;

    @Column(name = "cidade", nullable = false)
    private String city;

    @Column(name = "bairro", nullable = false)
    private String district;

    @Column(name = "rua", nullable = false)
    private String street;

    @Column(name = "numero", nullable = false)
    private String number;
    
    @Column(name = "complemento", nullable = true)
    private String complement;
}
