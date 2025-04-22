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

    public static final String ROLLBACK_CUSTOMER_QUEUE = "rollback.customer.queue";
    public static final String ROLLBACK_CUSTOMER_EXCHANGE = "rollback.customer.exchange";

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
        return new Queue(ROLLBACK_CUSTOMER_EXCHANGE, true);
    }

    @Bean
    public Exchange rollbackCustomerExchange() {
        return new DirectExchange(ROLLBACK_CUSTOMER_EXCHANGE, true, false);
    }

    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        Jackson2JsonMessageConverter converter = new Jackson2JsonMessageConverter();
        return converter;
    }
}
