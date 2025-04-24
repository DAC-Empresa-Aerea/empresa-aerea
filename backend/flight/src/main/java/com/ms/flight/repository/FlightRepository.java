package com.ms.flight.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ms.flight.model.Flight;


public interface FlightRepository extends JpaRepository<Flight, String> {

    @Query("SELECT f FROM Flight f " +
           "WHERE f.origem.codigo = :origem " +
           "AND f.destino.codigo = :destino " +
           "AND DATE(f.data) = DATE(:data)")
    List<Flight> findByAirportAndDate(
        @Param("origem") String origem,
        @Param("destino") String destino,
        @Param("data") LocalDateTime data
    );

}