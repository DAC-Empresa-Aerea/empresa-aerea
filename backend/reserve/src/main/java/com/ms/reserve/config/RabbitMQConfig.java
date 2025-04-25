package com.ms.reserve.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String RESERVE_STATUS_UPDATED_QUEUE = "reserve.status.updated";
    public static final String RESERVE_STATUS_UPDATED_EXCHANGE = "reserve.status.updated.exchange";
    public static final String RESERVE_STATUS_UPDATED_ROUTING_KEY = "reserve.status.updated";
    
    @Bean
    public Queue reserveStatusUpdatedQueue() {
        return new Queue(RESERVE_STATUS_UPDATED_QUEUE, true);
    }

    @Bean
    public TopicExchange reserveStatusUpdatedExchange() {
        return new TopicExchange(RESERVE_STATUS_UPDATED_EXCHANGE);
    }

    @Bean
    public Binding reserveStatusUpdatedBinding(Queue reserveStatusUpdatedQueue, TopicExchange reserveStatusUpdatedExchange) {
        return BindingBuilder.bind(reserveStatusUpdatedQueue).to(reserveStatusUpdatedExchange).with(RESERVE_STATUS_UPDATED_ROUTING_KEY);
    }
}

