package com.ms.reserve.command.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ms.reserve.command.model.ReserveHistoryCommand;

public interface ReserveHistoryCommandRepository extends JpaRepository<ReserveHistoryCommand, Long> {
    
}
