package com.ms.reserve.producer;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ms.reserve.config.RabbitMQConfig;
import com.ms.reserve.dto.cqrs.UpdateStatusDTO;

@Component
public class CQRSProducer {
    
    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void sendStatusUpdate(String reserveId, String status) {
        
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.RESERVE_STATUS_UPDATED_EXCHANGE, 
            RabbitMQConfig.RESERVE_STATUS_UPDATED_ROUTING_KEY, 
            new UpdateStatusDTO(reserveId, status)
        );
    }

}
