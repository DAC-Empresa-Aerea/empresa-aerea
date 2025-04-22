package com.ms.reserve.command.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ms.reserve.command.model.ReserveCommand;

public interface ReserveCommandRepository extends JpaRepository<ReserveCommand, String> {
    
}
