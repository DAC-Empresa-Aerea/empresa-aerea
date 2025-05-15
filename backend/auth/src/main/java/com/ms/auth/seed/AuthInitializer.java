package com.ms.auth.seed;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.ms.auth.model.Auth;
import com.ms.auth.repository.AuthRepository;

import java.util.List;

@Configuration
public class AuthInitializer {

    @Bean
    public ApplicationRunner initAuths(AuthRepository repository) {
        return args -> {
            List<Auth> predefinedAuths = List.of(
                new Auth(null, "func_pre@gmail.com", "8ZcVXvA1SikCz0As2ELgGIrvpaUB4zuXDD6wyGw9BN0=", "FUNCIONARIO", "C1BqkjUcsogVhsgcemhwHw==") // SENHA = TADS
            );

            for (Auth auth : predefinedAuths) {
                boolean exists = repository.existsByLogin(auth.getLogin());

                if (!exists) {
                    repository.save(auth);
                }
            }
        };
    }
}
