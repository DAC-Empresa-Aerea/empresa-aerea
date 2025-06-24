package com.ms.reserve.producer;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ms.reserve.config.RabbitMQConfig;
import com.ms.reserve.dto.cqrs.RegisteredReserveDTO;
import com.ms.reserve.dto.cqrs.UpdateStatusDTO;

@Component
public class CQRSProducer {
    
    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void sendStatusUpdate(String reserveCode, String status) {
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.RESERVE_STATUS_UPDATED_EXCHANGE, 
            RabbitMQConfig.RESERVE_STATUS_UPDATED_ROUTING_KEY, 
            new UpdateStatusDTO(reserveCode, status)
        );
    }

    public void sendReserveCreated(RegisteredReserveDTO reserve) {
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.RESERVE_CREATED_EXCHANGE, 
            RabbitMQConfig.RESERVE_CREATED_ROUTING_KEY, 
            reserve
        );
    }

    public void sendRollbackReserve(String reserveCode) {
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.DELETE_RESERVE_EXCHANGE, 
            RabbitMQConfig.DELETE_RESERVE_ROUTING_KEY, 
            reserveCode
        );
    }

    public void sendRollbackReserveStatus(UpdateStatusDTO dto) {
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.ROLLBACK_RESERVE_STATUS_UPDATE_EXCHANGE, 
            RabbitMQConfig.ROLLBACK_RESERVE_STATUS_UPDATE_ROUTING_KEY, 
            dto
        );
    }
}
