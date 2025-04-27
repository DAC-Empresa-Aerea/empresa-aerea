package com.ms.saga.config;

import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String CREATE_AUTH_EXCHANGE = "create.auth.exchange";
    public static final String CREATE_AUTH_ROUTING_KEY = "create.auth.routing.key";

    public static final String CREATE_CUSTOMER_EXCHANGE = "create.customer.exchange";
    public static final String CREATE_CUSTOMER_ROUTING_KEY = "create.customer.routing.key";

    public static final String ROLLBACK_CUSTOMER_EXCHANGE = "rollback.customer.exchange";
    public static final String ROLLBACK_CUSTOMER_ROUTING_KEY = "rollback.customer.routing.key";

    public static final String RESERVE_SEAT_EXCHANGE = "reserve.seat.exchange";
    public static final String RESERVE_SEAT_ROUTING_KEY = "reserve.seat.routing.key";

    public static final String UPDATE_FLIGHT_EXCHANGE = "update.flight.exchange";
    public static final String UPDATE_FLIGHT_ROUTING_KEY = "update.flight.routing.key";

    public static final String ROLLBACK_FLIGHT_EXCHANGE = "rollback.flight.exchange";
    public static final String ROLLBACK_FLIGHT_ROUTING_KEY = "rollback.flight.routing.key";

    public static final String UPDATE_RESERVE_EXCHANGE = "update.reserve.exchange";
    public static final String UPDATE_RESERVE_ROUTING_KEY = "update.reserve.routing.key";

    public static final String REGISTER_RESERVE_EXCHANGE = "register.reserve.exchange";
    public static final String REGISTER_RESERVE_ROUTING_KEY = "register.reserve.routing.key";

    public static final String DEBIT_SEAT_EXCHANGE = "debit.seat.exchange";
    public static final String DEBIT_SEAT_ROUTING_KEY = "debit.seat.routing.key";

    public static final String ROLLBACK_RESERVE_SEAT_EXCHANGE = "rollback.debit.seat.exchange";
    public static final String ROLLBACK_RESERVE_SEAT_ROUTING_KEY = "rollback.debit.seat.routing.key";

    public static final String ROLLBACK_REGISTER_RESERVE_EXCHANGE = "rollback.register.reserve.exchange";
    public static final String ROLLBACK_REGISTER_RESERVE_ROUTING_KEY = "rollback.register.reserve.routing.key";
    
    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        Jackson2JsonMessageConverter converter = new Jackson2JsonMessageConverter();
        return converter;
    }
    
}
