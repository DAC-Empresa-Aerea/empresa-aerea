package com.ms.flight.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ms.flight.model.Airport;

public interface AirportRepository extends JpaRepository<Airport, String> {

}
