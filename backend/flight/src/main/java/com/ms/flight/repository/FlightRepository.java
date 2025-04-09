package com.ms.flight.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ms.flight.models.Flight;


public interface FlightRepository extends JpaRepository<Flight, UUID> {

}