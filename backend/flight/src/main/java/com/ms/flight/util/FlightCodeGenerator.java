package com.ms.flight.util;

import java.security.SecureRandom;

import org.springframework.stereotype.Component;

@Component
public class FlightCodeGenerator {
 
    private static final SecureRandom random = new SecureRandom();
    private static final String LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    public static String generateFlightCode() {
        StringBuilder code = new StringBuilder(8);

        for (int i = 0; i < 4; i++) {
            code.append(LETTERS.charAt(random.nextInt(LETTERS.length())));
        }
        
        for (int i = 0; i < 4; i++) {
            code.append(random.nextInt(10));
        }

        return code.toString();
    }

}
