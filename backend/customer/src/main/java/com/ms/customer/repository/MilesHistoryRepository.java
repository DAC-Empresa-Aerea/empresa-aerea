package com.ms.customer.repository;

import java.time.OffsetDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ms.customer.model.Customer;
import com.ms.customer.model.MilesHistory;

public interface MilesHistoryRepository extends JpaRepository<MilesHistory, OffsetDateTime> {
    List<MilesHistory> findByCustomer(Customer customer);
    List<MilesHistory> findByCustomerAndDateBetween(Customer customer, OffsetDateTime startDate, OffsetDateTime endDate);
    List<MilesHistory> findByCustomerAndType(Customer cliente, String tipo);
}
