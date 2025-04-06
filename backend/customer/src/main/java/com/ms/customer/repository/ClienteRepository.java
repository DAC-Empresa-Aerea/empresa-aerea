package com.ms.customer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ms.customer.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

}
