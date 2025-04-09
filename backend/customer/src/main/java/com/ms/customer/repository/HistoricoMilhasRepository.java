package com.ms.customer.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ms.customer.model.Cliente;
import com.ms.customer.model.HistoricoMilhas;

public interface HistoricoMilhasRepository extends JpaRepository<HistoricoMilhas, Long> {
    List<HistoricoMilhas> findByCliente(Cliente cliente);
    List<HistoricoMilhas> findByClienteAndDataBetween(Cliente cliente, LocalDateTime startDate, LocalDateTime endDate);
    List<HistoricoMilhas> findByClienteAndTipo(Cliente cliente, String tipo);
}
