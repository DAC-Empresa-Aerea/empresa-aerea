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

    public static final String UPDATE_EMPLOYEE_QUEUE = "update.employee.queue";
    public static final String UPDATE_EMPLOYEE_EXCHANGE = "update.employee.exchange";
    public static final String UPDATE_EMPLOYEE_ROUTING_KEY = "update.employee.routing.key";

    public static final String DELETE_EMPLOYEE_QUEUE = "delete.employee.queue";
    public static final String DELETE_EMPLOYEE_EXCHANGE = "delete.employee.exchange";
    public static final String DELETE_EMPLOYEE_ROUTING_KEY = "delete.employee.routing.key";

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
    public Binding rollbackCreateEmployeeBinding(Queue rollbackCreateEmployeeQueue, Exchange rollbackCreateEmployeeExchange) {
        return BindingBuilder
                .bind(rollbackCreateEmployeeQueue)
                .to(rollbackCreateEmployeeExchange)
                .with(ROLLBACK_CREATE_EMPLOYEE_ROUTING_KEY)
                .noargs();
    }

    @Bean
    public Queue updateEmployeeQueue() {
        return new Queue(UPDATE_EMPLOYEE_QUEUE, true);
    }

    @Bean
    public Exchange updateEmployeeExchange() {
        return new DirectExchange(UPDATE_EMPLOYEE_EXCHANGE, true, false);
    }
    
    @Bean
    public Binding updateEmployeeBinding(Queue updateEmployeeQueue, Exchange updateEmployeeExchange) {
        return BindingBuilder
                .bind(updateEmployeeQueue)
                .to(updateEmployeeExchange)
                .with(UPDATE_EMPLOYEE_ROUTING_KEY)
                .noargs();
    }

    @Bean
    public Queue deleteEmployeeQueue() {
        return new Queue(DELETE_EMPLOYEE_QUEUE, true);
    }

    @Bean
    public Exchange deleteEmployeeExchange() {
        return new DirectExchange(DELETE_EMPLOYEE_EXCHANGE, true, false);
    }
    
    @Bean
    public Binding deleteEmployeeBinding(Queue deleteEmployeeQueue, Exchange deleteEmployeeExchange) {
        return BindingBuilder
                .bind(deleteEmployeeQueue)
                .to(deleteEmployeeExchange)
                .with(DELETE_EMPLOYEE_ROUTING_KEY)
                .noargs();
    }

    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        Jackson2JsonMessageConverter converter = new Jackson2JsonMessageConverter();
        return converter;
    }
}
