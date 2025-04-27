package com.ms.saga.producer;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ms.saga.config.RabbitMQConfig;
import com.ms.saga.dto.flight.FlightStatusDTO;

@Component
public class ReserveProducer {
    
    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void sendCreateReserve() {
    }

    //Isso sera para atualizar caso o voo tenha mudado estado
    public void updateStatusReserve(FlightStatusDTO dto) {
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.UPDATE_RESERVE_EXCHANGE,
            RabbitMQConfig.UPDATE_RESERVE_ROUTING_KEY,
            dto
        );
    }

}
