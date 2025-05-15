package com.ms.auth.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.ms.auth.model.Auth;

public interface AuthRepository extends MongoRepository<Auth, ObjectId> {
    boolean existsByLogin(String login);
    Auth findByLogin(String login);
}
