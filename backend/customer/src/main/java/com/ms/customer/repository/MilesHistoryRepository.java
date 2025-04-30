package com.ms.customer.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ms.customer.model.Customer;
import com.ms.customer.model.MilesHistory;

public interface MilesHistoryRepository extends JpaRepository<MilesHistory, LocalDateTime> {
    List<MilesHistory> findByCustomer(Customer customer);
    List<MilesHistory> findByCustomerAndDataBetween(Customer customer, LocalDateTime startDate, LocalDateTime endDate);
    List<MilesHistory> findByCustomerAndType(Customer cliente, String tipo);
}
