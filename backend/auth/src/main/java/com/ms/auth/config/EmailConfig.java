package com.ms.auth.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;


@Configuration
public class EmailConfig {
    
    @Value("${mail.activate.send}")
    private boolean isActivateSend;

    public boolean isActivateSend() {
        return isActivateSend;
    }

}
