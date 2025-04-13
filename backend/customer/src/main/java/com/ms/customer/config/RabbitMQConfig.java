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

    @Bean
    public Queue createCustomerQueue() {
        return new Queue("create.customer.queue", true);
    }

    @Bean
    public Exchange createCustomerExchange() {
        return new DirectExchange("create.customer.exchange", true, false);
    }

    @Bean 
    public Binding createCustomerBinding(Queue createCustomerQueue, Exchange createCustomerExchange) {
        return BindingBuilder
                .bind(createCustomerQueue)
                .to(createCustomerExchange)
                .with("create.customer.routing.key")
                .noargs();
    }

    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        Jackson2JsonMessageConverter converter = new Jackson2JsonMessageConverter();
        return converter;
    }
}
