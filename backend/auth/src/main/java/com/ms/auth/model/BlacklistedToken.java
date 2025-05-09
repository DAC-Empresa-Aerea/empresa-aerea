package com.ms.auth.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Document(collection = "blacklisted_tokens")
@Getter
@Setter
public class BlacklistedToken {
    @Id
    private String jti;
    private Date expiresAt;
}