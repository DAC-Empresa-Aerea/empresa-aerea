package com.ms.reserve.query.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ms.reserve.query.model.ReserveStatusQuery;

public interface ReserveStatusQueryRepository extends JpaRepository< ReserveStatusQuery, String> {
    
}
