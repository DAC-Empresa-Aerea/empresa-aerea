package com.ms.auth.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ms.auth.model.Auth;

public interface AuthRepository extends MongoRepository<Auth, Long> {

}
