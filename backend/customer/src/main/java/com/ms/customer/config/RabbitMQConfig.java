package com.ms.customer.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Exchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String CREATE_CUSTOMER_QUEUE = "create.customer.queue";
    public static final String CREATE_CUSTOMER_EXCHANGE = "create.customer.exchange";
    public static final String CREATE_CUSTOMER_ROUTING_KEY = "create.customer.routing.key";

    public static final String ROLLBACK_CUSTOMER_QUEUE = "rollback.create.customer.queue";
    public static final String ROLLBACK_CUSTOMER_EXCHANGE = "rollback.create.customer.exchange";
    public static final String ROLLBACK_CUSTOMER_ROUTING_KEY = "rollback.create.customer.routing.key";

    public static final String DEBIT_SEAT_QUEUE = "debit.seat.queue";
    public static final String DEBIT_SEAT_EXCHANGE = "debit.seat.exchange";
    public static final String DEBIT_SEAT_ROUTING_KEY = "debit.seat.routing.key";

    public static final String REFUND_MILES_QUEUE = "refund.miles.queue";
    public static final String REFUND_MILES_EXCHANGE = "refund.miles.exchange";
    public static final String REFUND_MILES_ROUTING_KEY = "refund.miles.routing.key";

    public static final String ROLLBACK_RESERVE_SEAT_QUEUE = "rollback.debit.seat.queue";
    public static final String ROLLBACK_RESERVE_SEAT_EXCHANGE = "rollback.debit.seat.exchange";
    public static final String ROLLBACK_RESERVE_SEAT_ROUTING_KEY = "rollback.debit.seat.routing.key";

    public static final String GET_MILES_QUEUE = "get.miles.queue";
    public static final String GET_MILES_EXCHANGE = "get.miles.exchange";
    public static final String GET_MILES_ROUTING_KEY = "get.miles.routing.key";

    @Bean
    public Queue createCustomerQueue() {
        return new Queue(CREATE_CUSTOMER_QUEUE, true);
    }

    @Bean
    public Exchange createCustomerExchange() {
        return new DirectExchange(CREATE_CUSTOMER_EXCHANGE, true, false);
    }

    @Bean 
    public Binding createCustomerBinding(Queue createCustomerQueue, Exchange createCustomerExchange) {
        return BindingBuilder
                .bind(createCustomerQueue)
                .to(createCustomerExchange)
                .with(CREATE_CUSTOMER_ROUTING_KEY)
                .noargs();
    }

    @Bean
    public Queue rollbackCustomerQueue() {
        return new Queue(ROLLBACK_CUSTOMER_QUEUE, true);
    }

    @Bean
    public Exchange rollbackCustomerExchange() {
        return new DirectExchange(ROLLBACK_CUSTOMER_EXCHANGE, true, false);
    }

    @Bean Binding rollbackCustomerBinding(Queue rollbackCustomerQueue, Exchange rollbackCustomerExchange) {
        return BindingBuilder
                .bind(rollbackCustomerQueue)
                .to(rollbackCustomerExchange)
                .with(ROLLBACK_CUSTOMER_ROUTING_KEY)
                .noargs();
    }

    @Bean
    public Queue debitSeatQueue() {
        return new Queue(DEBIT_SEAT_QUEUE, true);
    }

    @Bean
    public Exchange debitSeatExchange() {
        return new DirectExchange(DEBIT_SEAT_EXCHANGE, true, false);
    }

    @Bean Binding debitSeatBinding(Queue debitSeatQueue, Exchange debitSeatExchange) {
        return BindingBuilder
                .bind(debitSeatQueue)
                .to(debitSeatExchange)
                .with(DEBIT_SEAT_ROUTING_KEY)
                .noargs();
    }

    @Bean
    public Queue refundMilesQueue() {
        return new Queue(REFUND_MILES_QUEUE, true);
    }

    @Bean
    public Exchange refundMilesExchange() {
        return new DirectExchange(REFUND_MILES_EXCHANGE, true, false);
    }

    @Bean
    public Binding refundMilesBinding(Queue refundMilesQueue, Exchange refundMilesExchange) {
        return BindingBuilder
                .bind(refundMilesQueue)
                .to(refundMilesExchange)
                .with(REFUND_MILES_ROUTING_KEY)
                .noargs();
    }

    @Bean
    public Queue getMilesQueue() {
        return new Queue(GET_MILES_QUEUE, true);
    }

    @Bean
    public Exchange getMilesExchange() {
        return new DirectExchange(GET_MILES_EXCHANGE, true, false);
    }

    @Bean
    public Binding getMilesBinding(Queue getMilesQueue, Exchange getMilesExchange) {
        return BindingBuilder
                .bind(getMilesQueue)
                .to(getMilesExchange)
                .with(GET_MILES_ROUTING_KEY)
                .noargs();
    }

    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        Jackson2JsonMessageConverter converter = new Jackson2JsonMessageConverter();
        return converter;
    }
}
