package com.ms.customer.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ms.customer.model.Customer;
import com.ms.customer.model.MilesHistory;

public interface HistoricoMilhasRepository extends JpaRepository<MilesHistory, LocalDateTime> {
    List<MilesHistory> findByCliente(Customer cliente);
    List<MilesHistory> findByClienteAndDataBetween(Customer cliente, LocalDateTime startDate, LocalDateTime endDate);
    List<MilesHistory> findByClienteAndTipo(Customer cliente, String tipo);
}
