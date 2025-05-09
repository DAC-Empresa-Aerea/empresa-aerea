package com.ms.auth.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ms.auth.model.BlacklistedToken;
import com.ms.auth.repository.BlacklistRepository;

@Service
public class BlacklistService {

    @Autowired
    private BlacklistRepository repo;

    public void blacklistToken(String jti, Date expiresAt) {
        BlacklistedToken bt = new BlacklistedToken();
        bt.setJti(jti);
        bt.setExpiresAt(expiresAt);
        repo.save(bt);
    }

    public boolean isBlacklisted(String jti) {
        return repo.existsById(jti);
    }
    
}
