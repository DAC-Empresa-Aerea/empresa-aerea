package com.ms.customer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ms.customer.model.Customer;

public interface ClienteRepository extends JpaRepository<Customer, Long> {

}
