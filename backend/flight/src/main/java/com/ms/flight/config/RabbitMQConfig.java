package com.ms.flight.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Exchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class RabbitMQConfig {

    public static final String UPDATE_FLIGHT_STATUS_QUEUE = "update.flight.status.queue";
    public static final String UPDATE_FLIGHT_STATUS_EXCHANGE = "update.flight.status.exchange";
    public static final String UPDATE_FLIGHT_STATUS_ROUTING_KEY = "update.flight.status.routing.key";
    
    public static final String ROLLBACK_FLIGHT_STATUS_QUEUE = "rollback.flight.status.queue";
    public static final String ROLLBACK_FLIGHT_STATUS_EXCHANGE = "rollback.flight.status.exchange";
    public static final String ROLLBACK_FLIGHT_STATUS_ROUTING_KEY = "rollback.flight.status.routing.key";

    public static final String RESERVE_SEAT_QUEUE = "reserve.seat.queue";
    public static final String RESERVE_SEAT_EXCHANGE = "reserve.seat.exchange";
    public static final String RESERVE_SEAT_ROUTING_KEY = "reserve.seat.routing.key";

    public static final String ROLLBACK_RESERVE_SEAT_QUEUE = "rollback.reserve.seat.queue";
    public static final String ROLLBACK_RESERVE_SEAT_EXCHANGE = "rollback.reserve.seat.exchange";
    public static final String ROLLBACK_RESERVE_SEAT_ROUTING_KEY = "rollback.reserve.seat.routing.key";


    @Bean
    public Queue reserveSeatQueue() {
        return new Queue(RESERVE_SEAT_QUEUE, true);
    }

    @Bean
    public Exchange reserveSeatExchange() {
        return new DirectExchange(RESERVE_SEAT_EXCHANGE, true, false);
    }

    @Bean
    public Binding reserveSeatBinding(Queue reserveSeatQueue, Exchange reserveSeatExchange) {
        return BindingBuilder
                .bind(reserveSeatQueue)
                .to(reserveSeatExchange)
                .with(RESERVE_SEAT_ROUTING_KEY)
                .noargs();
    }
    
    @Bean
    public Queue updateFlightStatusQueue() {
        return new Queue(UPDATE_FLIGHT_STATUS_QUEUE, true);
    }
    
    @Bean
    public Exchange updateFlightStatusExchange() {
        return new DirectExchange(UPDATE_FLIGHT_STATUS_EXCHANGE, true, false);
    }
    
    @Bean
    public Binding updateFlightStatusBinding(Queue updateFlightStatusQueue, Exchange updateFlightStatusExchange) {
        return BindingBuilder
        .bind(updateFlightStatusQueue)
        .to(updateFlightStatusExchange)
        .with(UPDATE_FLIGHT_STATUS_ROUTING_KEY)
        .noargs();
    }

    @Bean
    public Queue rollbackFlightStatusQueue() {
        return new Queue(ROLLBACK_FLIGHT_STATUS_QUEUE, true);
    }

    @Bean
    public Exchange rollbackFlightStatusExchange() {
        return new DirectExchange(ROLLBACK_FLIGHT_STATUS_EXCHANGE, true, false);
    }

    @Bean
    public Binding rollbackFlightStatusBinding(Queue rollbackFlightStatusQueue, Exchange rollbackFlightStatusExchange) {
        return BindingBuilder
                .bind(rollbackFlightStatusQueue)
                .to(rollbackFlightStatusExchange)
                .with(ROLLBACK_FLIGHT_STATUS_ROUTING_KEY)
                .noargs();
    }

    @Bean
    public Queue rollbackReserveSeatQueue() {
        return new Queue(ROLLBACK_RESERVE_SEAT_QUEUE, true);
    }

    @Bean Exchange rollbackReserveSeatExchange() {
        return new DirectExchange(ROLLBACK_RESERVE_SEAT_EXCHANGE, true, false);
    }

    @Bean
    public Binding rollbackReserveSeatBinding(Queue rollbackReserveSeatQueue, Exchange rollbackReserveSeatExchange) {
        return BindingBuilder
                .bind(rollbackReserveSeatQueue)
                .to(rollbackReserveSeatExchange)
                .with(ROLLBACK_RESERVE_SEAT_ROUTING_KEY)
                .noargs();
    }
    
    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        Jackson2JsonMessageConverter converter = new Jackson2JsonMessageConverter();
        return converter;
    }

}
