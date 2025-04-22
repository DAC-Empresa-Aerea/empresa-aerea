package com.ms.reserve.query.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ms.reserve.query.model.ReserveHistoryQuery;

public interface ReserveHistoryQueryRepository extends JpaRepository<ReserveHistoryQuery, Long> {
    
}
