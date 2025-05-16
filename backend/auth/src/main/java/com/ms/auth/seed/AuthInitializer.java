package com.ms.auth.seed;

import com.ms.auth.model.Auth;
import com.ms.auth.repository.AuthRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AuthInitializer implements DataSeeder {

    private final AuthRepository repository;

    public AuthInitializer(AuthRepository repository) {
        this.repository = repository;
    }

    @Override
    public void seed() {
        List<Auth> predefinedAuths = List.of(
            new Auth(
                null,
                "func_pre@gmail.com",
                "8ZcVXvA1SikCz0As2ELgGIrvpaUB4zuXDD6wyGw9BN0=", // senha: TADS  
                "FUNCIONARIO",
                "C1BqkjUcsogVhsgcemhwHw=="
            )
        );

        for (Auth auth : predefinedAuths) {
            if (!repository.existsByLogin(auth.getLogin())) {
                repository.save(auth);
            }
        }
    }
}
