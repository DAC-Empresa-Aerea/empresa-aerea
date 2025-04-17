package com.ms.auth.util;

import java.security.SecureRandom;

public class PasswordGeneratorUtil {
    private static final SecureRandom random = new SecureRandom();
    private static final int CODE_LENGTH = 4;

    public static String generate() {
        StringBuilder code = new StringBuilder(CODE_LENGTH);
        for (int i = 0; i < CODE_LENGTH; i++) {
            int digit = random.nextInt(10);
            code.append(digit);
        }
        return code.toString();
    }
}
