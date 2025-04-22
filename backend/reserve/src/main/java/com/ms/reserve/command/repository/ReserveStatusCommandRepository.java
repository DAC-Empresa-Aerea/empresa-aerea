package com.ms.reserve.command.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ms.reserve.command.model.ReserveStatusCommand;

public interface ReserveStatusCommandRepository extends JpaRepository< ReserveStatusCommand, String> {
    
}
