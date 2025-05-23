package com.ms.reserve.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String RESERVE_STATUS_UPDATED_QUEUE = "reserve.status.updated";
    public static final String RESERVE_STATUS_UPDATED_EXCHANGE = "reserve.status.updated.exchange";
    public static final String RESERVE_STATUS_UPDATED_ROUTING_KEY = "reserve.status.updated";

    public static final String RESERVE_CREATED_QUEUE = "reserve.created.queue";
    public static final String RESERVE_CREATED_EXCHANGE = "reserve.created.exchange";
    public static final String RESERVE_CREATED_ROUTING_KEY = "reserve.created.routing.key";

    public static final String REGISTER_RESERVE_QUEUE = "register.reserve.queue";
    public static final String REGISTER_RESERVE_EXCHANGE = "register.reserve.exchange";
    public static final String REGISTER_RESERVE_ROUTING_KEY = "register.reserve.routing.key";

    public static final String ROLLBACK_REGISTER_RESERVE_QUEUE = "rollback.register.reserve.queue";
    public static final String ROLLBACK_REGISTER_RESERVE_EXCHANGE = "rollback.register.reserve.exchange";
    public static final String ROLLBACK_REGISTER_RESERVE_ROUTING_KEY = "rollback.register.reserve.routing.key";

    public static final String DELETE_RESERVE_QUEUE = "delete.reserve.queue";
    public static final String DELETE_RESERVE_EXCHANGE = "delete.reserve.exchange";
    public static final String DELETE_RESERVE_ROUTING_KEY = "delete.reserve.routing.key";

    public static final String CANCEL_RESERVE_QUEUE = "cancel.reserve.queue";
    public static final String CANCEL_RESERVE_EXCHANGE = "cancel.reserve.exchange";
    public static final String CANCEL_RESERVE_ROUTING_KEY = "cancel.reserve.routing.key";

    public static final String ROLLBACK_CANCEL_RESERVE_QUEUE = "rollback.cancel.reserve.queue";
    public static final String ROLLBACK_CANCEL_RESERVE_EXCHANGE = "rollback.cancel.reserve.exchange";
    public static final String ROLLBACK_CANCEL_RESERVE_ROUTING_KEY = "rollback.cancel.reserve.routing.key";

    public static final String GET_RESERVE_QUEUE = "get.reserve.queue";
    public static final String GET_RESERVE_EXCHANGE = "get.reserve.exchange";
    public static final String GET_RESERVE_ROUTING_KEY = "get.reserve.routing.key";
    
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

    @Bean
    public Queue reserveCreatedQueue() {
        return new Queue(RESERVE_CREATED_QUEUE, true);
    }

    @Bean
    public TopicExchange reserveCreatedExchange() {
        return new TopicExchange(RESERVE_CREATED_EXCHANGE);
    }

    @Bean 
    public Binding reserveCreatedBinding(Queue reserveCreatedQueue, TopicExchange reserveCreatedExchange) {
        return BindingBuilder.bind(reserveCreatedQueue).to(reserveCreatedExchange).with(RESERVE_CREATED_ROUTING_KEY);
    }

    @Bean
    public Queue registerReserveQueue() {
        return new Queue(REGISTER_RESERVE_QUEUE, true);
    }

    @Bean
    public TopicExchange registerReserveExchange() {
        return new TopicExchange(REGISTER_RESERVE_EXCHANGE);
    }

    @Bean
    public Binding registerReserveBinding(Queue registerReserveQueue, TopicExchange registerReserveExchange) {
        return BindingBuilder.bind(registerReserveQueue).to(registerReserveExchange).with(REGISTER_RESERVE_ROUTING_KEY);
    }

    @Bean
    public Queue rollbackRegisterReserveQueue() {
        return new Queue(ROLLBACK_REGISTER_RESERVE_QUEUE, true);
    }

    @Bean
    public TopicExchange rollbackRegisterReserveExchange() {
        return new TopicExchange(ROLLBACK_REGISTER_RESERVE_EXCHANGE);
    }

    @Bean
    public Binding rollbackRegisterReserveBinding(Queue rollbackRegisterReserveQueue, TopicExchange rollbackRegisterReserveExchange) {
        return BindingBuilder.bind(rollbackRegisterReserveQueue).to(rollbackRegisterReserveExchange).with(ROLLBACK_REGISTER_RESERVE_ROUTING_KEY);
    }

    @Bean
    public Queue deleteReserveQueue() {
        return new Queue(DELETE_RESERVE_QUEUE, true);
    }

    @Bean
    public TopicExchange deleteReserveExchange() {
        return new TopicExchange(DELETE_RESERVE_EXCHANGE);
    }

    @Bean
    public Binding deleteReserveBinding(Queue deleteReserveQueue, TopicExchange deleteReserveExchange) {
        return BindingBuilder
                .bind(deleteReserveQueue)
                .to(deleteReserveExchange)
                .with(DELETE_RESERVE_ROUTING_KEY);
    }

    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        Jackson2JsonMessageConverter converter = new Jackson2JsonMessageConverter();
        return converter;
    }
    
    @Bean
    public Queue getReserveQueue() {
        return new Queue(GET_RESERVE_QUEUE, true);
    }

    @Bean
    public TopicExchange getReserveExchange() {
        return new TopicExchange(GET_RESERVE_EXCHANGE);
    }

    @Bean
    public Binding getReserveBinding() {
        return BindingBuilder.bind(getReserveQueue())
                        .to(getReserveExchange())
                        .with(GET_RESERVE_ROUTING_KEY);
    }
    
}

