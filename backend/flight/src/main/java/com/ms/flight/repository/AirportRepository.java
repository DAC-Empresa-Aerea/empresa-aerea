package com.ms.flight.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ms.flight.models.Airport;

public interface AirportRepository extends JpaRepository<Airport, Long> {
      
}
