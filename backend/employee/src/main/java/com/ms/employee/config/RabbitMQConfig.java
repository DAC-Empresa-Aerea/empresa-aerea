package com.ms.employee.config;

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
    
    public static final String CREATE_EMPLOYEE_QUEUE = "create.employee.queue";
    public static final String CREATE_EMPLOYEE_EXCHANGE = "create.employee.exchange";
    public static final String CREATE_EMPLOYEE_ROUTING_KEY = "create.employee.routing.key";

    public static final String ROLLBACK_CREATE_EMPLOYEE_QUEUE = "rollback.create.employee.queue";
    public static final String ROLLBACK_CREATE_EMPLOYEE_EXCHANGE = "rollback.create.employee.exchange";
    public static final String ROLLBACK_CREATE_EMPLOYEE_ROUTING_KEY = "rollback.create.employee.routing.key";

    @Bean
    public Queue createEmployeeQueue() {
        return new Queue(CREATE_EMPLOYEE_QUEUE, true);
    }

    @Bean
    public Exchange createEmployeeExchange() {
        return new DirectExchange(CREATE_EMPLOYEE_EXCHANGE, true, false);
    }
    
    @Bean
    public Binding createEmployeeBinding(Queue createEmployeeQueue, Exchange createEmployeeExchange) {
        return BindingBuilder
                .bind(createEmployeeQueue)
                .to(createEmployeeExchange)
                .with(CREATE_EMPLOYEE_ROUTING_KEY)
                .noargs();
    }

    @Bean
    public Queue rollbackCreateEmployeeQueue() {
        return new Queue(ROLLBACK_CREATE_EMPLOYEE_QUEUE, true);
    }

    @Bean
    public Exchange rollbackCreateEmployeeExchange() {
        return new DirectExchange(ROLLBACK_CREATE_EMPLOYEE_EXCHANGE, true, false);
    }

    @Bean
    public Binding rollbackCreateEmployeeBinding(Queue rollbackEmployeeQueue, Exchange rollbackEmployeeExchange) {
        return BindingBuilder
                .bind(rollbackEmployeeQueue)
                .to(rollbackEmployeeExchange)
                .with(ROLLBACK_CREATE_EMPLOYEE_ROUTING_KEY)
                .noargs();
    }

    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        Jackson2JsonMessageConverter converter = new Jackson2JsonMessageConverter();
        return converter;
    }
}
