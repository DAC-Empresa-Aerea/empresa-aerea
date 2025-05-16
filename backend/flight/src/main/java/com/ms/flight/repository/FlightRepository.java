package com.ms.flight.repository;

import java.time.OffsetDateTime;
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
        @Param("data") OffsetDateTime data
    );

    @Query("SELECT f FROM Flight f WHERE f.data BETWEEN :dataInicio AND :dataFim")
    List<Flight> findAllByDateBetween(
        @Param("dataInicio") OffsetDateTime dataInicio,
        @Param("dataFim") OffsetDateTime dataFim
    );

}