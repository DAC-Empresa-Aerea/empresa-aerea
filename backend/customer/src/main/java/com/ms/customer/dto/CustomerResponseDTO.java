package com.ms.customer.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CustomerResponseDTO {

    private Long codigo;
    private String cpf;
    private String email;
    private String nome;

    @JsonProperty("saldo_milhas")
    private Integer saldoMilhas;

    private AddressDTO endereco;

    public CustomerResponseDTO() {
    }

    public CustomerResponseDTO(Long codigo, String cpf, String email, String nome, Integer saldoMilhas, AddressDTO endereco) {
        this.codigo = codigo;
        this.cpf = cpf;
        this.email = email;
        this.nome = nome;
        this.saldoMilhas = saldoMilhas;
        this.endereco = endereco;
    }

    public Long getCodigo() {
        return codigo;
    }

    public void setCodigo(Long codigo) {
        this.codigo = codigo;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getSaldoMilhas() {
        return saldoMilhas;
    }

    public void setSaldoMilhas(Integer saldoMilhas) {
        this.saldoMilhas = saldoMilhas;
    }

    public AddressDTO getEndereco() {
        return endereco;
    }

    public void setEndereco(AddressDTO endereco) {
        this.endereco = endereco;
    }
}

