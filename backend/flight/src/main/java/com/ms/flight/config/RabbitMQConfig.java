package com.ms.flight.config;

import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Exchange;
import org.springframework.amqp.core.Queue;

@Configuration
public class RabbitMQConfig {

    public static final String UPDATE_FLIGHT_QUEUE = "update.flight.queue";
    public static final String UPDATE_FLIGHT_EXCHANGE = "update.flight.exchange";
    public static final String UPDATE_FLIGHT_ROUTING_KEY = "update.flight.routing.key";
    
    public static final String ROLLBACK_FLIGHT_QUEUE = "rollback.flight.queue";
    public static final String ROLLBACK_FLIGHT_EXCHANGE = "rollback.flight.exchange";
    public static final String ROLLBACK_FLIGHT_ROUTING_KEY = "rollback.flight.routing.key";

    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        Jackson2JsonMessageConverter converter = new Jackson2JsonMessageConverter();
        return converter;
    }

    @Bean
    public Queue updateFlightQueue() {
        return new Queue(UPDATE_FLIGHT_QUEUE, true);
    }

    @Bean
    public Exchange updateFlightExchange() {
        return new DirectExchange(UPDATE_FLIGHT_EXCHANGE, true, false);
    }

    @Bean
    public Binding updateFlightBinding(Queue updateFlightQueue, Exchange updateFlightExchange) {
        return BindingBuilder
                .bind(updateFlightQueue)
                .to(updateFlightExchange)
                .with(UPDATE_FLIGHT_ROUTING_KEY)
                .noargs();
    }

    @Bean
    public Queue rollbackFlightQueue() {
        return new Queue(ROLLBACK_FLIGHT_QUEUE, true);
    }

    @Bean
    public Exchange rollbackFlightExchange() {
        return new DirectExchange(ROLLBACK_FLIGHT_EXCHANGE, true, false);
    }

    @Bean
    public Binding rollbackFlightBinding(Queue rollbackFlightQueue, Exchange rollbackFlightExchange) {
        return BindingBuilder
                .bind(rollbackFlightQueue)
                .to(rollbackFlightExchange)
                .with(ROLLBACK_FLIGHT_ROUTING_KEY)
                .noargs();
    }
    
}
