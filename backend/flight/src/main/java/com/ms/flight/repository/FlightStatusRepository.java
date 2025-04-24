package com.ms.flight.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ms.flight.model.FlightStatus;

public interface FlightStatusRepository extends JpaRepository<FlightStatus, String> {
    
}
