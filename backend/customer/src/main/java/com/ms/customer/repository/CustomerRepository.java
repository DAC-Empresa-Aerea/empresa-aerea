package com.ms.customer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ms.customer.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    boolean existsByEmail(String email);
    boolean existsByCpf(String cpf);
}
