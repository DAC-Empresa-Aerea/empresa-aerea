package com.ms.auth.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ms.auth.model.BlacklistedToken;

public interface BlacklistRepository extends MongoRepository<BlacklistedToken, String> {
    BlacklistedToken findByJti(String jti);
    boolean existsByJti(String jti);
}
