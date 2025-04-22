package com.ms.auth.config;

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
    public static final String CREATE_AUTH_QUEUE = "create.auth.queue";
    public static final String CREATE_AUTH_EXCHANGE = "create.auth.exchange";
    public static final String CREATE_AUTH_ROUTING_KEY = "create.auth.routing.key";


    @Bean
    public Queue createAuthQueue() {
        return new Queue(CREATE_AUTH_QUEUE, true);
    }

    @Bean
    public Exchange createAuthExchange() {
        return new DirectExchange(CREATE_AUTH_EXCHANGE, true, false);
    }

    @Bean
    public Binding createAuthBinding(Queue createAuthQueue, Exchange createAuthExchange) {
        return BindingBuilder.bind(createAuthQueue).to(createAuthExchange).with(CREATE_AUTH_ROUTING_KEY).noargs();
    }

    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        Jackson2JsonMessageConverter converter = new Jackson2JsonMessageConverter();
        return converter;
    }
}