package com.ms.reserve.query.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ms.reserve.query.model.ReserveQuery;

public interface ReserveQueryRepository extends JpaRepository<ReserveQuery, String> {
    public List<ReserveQuery> findByFlightCode(String flightCode);
}
