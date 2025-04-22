package com.ms.flight.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ms.flight.model.Flight;


public interface FlightRepository extends JpaRepository<Flight, String> {

}