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

    @Bean
    public Queue createAuthQueue() {
        return new Queue("create.auth.queue", true);
    }

    @Bean
    public Exchange createAuthExchange() {
        return new DirectExchange("create.auth.exchange", true, false);
    }

    @Bean
    public Binding createAuthBinding(Queue createAuthQueue, Exchange createAuthExchange) {
        return BindingBuilder.bind(createAuthQueue).to(createAuthExchange).with("create.auth.routing.key").noargs();
    }

    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        Jackson2JsonMessageConverter converter = new Jackson2JsonMessageConverter();
        return converter;
    }
}