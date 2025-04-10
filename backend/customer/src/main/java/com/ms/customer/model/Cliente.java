package com.ms.customer.model;
import jakarta.persistence.*;

@Entity
public class Cliente {

    @Id
    private Long codigo;
    private String cpf;
    private String email;
    private String nome;
    private Integer saldoMilhas;
    
    @Embedded
    private Endereco endereco;

    public Cliente() {
    }

    public Cliente(Long codigo, String cpf, String email, String nome, Integer saldoMilhas, Endereco endereco) {
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

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

}