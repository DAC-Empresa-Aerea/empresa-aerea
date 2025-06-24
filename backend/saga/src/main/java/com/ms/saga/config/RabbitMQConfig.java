package com.ms.saga.config;

import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String CREATE_AUTH_EXCHANGE = "create.auth.exchange";
    public static final String CREATE_AUTH_ROUTING_KEY = "create.auth.routing.key";

    public static final String UPDATE_AUTH_EXCHANGE = "update.auth.exchange";
    public static final String UPDATE_AUTH_ROUTING_KEY = "update.auth.routing.key";

    public static final String CREATE_CUSTOMER_EXCHANGE = "create.customer.exchange";
    public static final String CREATE_CUSTOMER_ROUTING_KEY = "create.customer.routing.key";

    public static final String ROLLBACK_CUSTOMER_EXCHANGE = "rollback.create.customer.exchange";
    public static final String ROLLBACK_CUSTOMER_ROUTING_KEY = "rollback.create.customer.routing.key";

    public static final String RESERVE_SEAT_EXCHANGE = "reserve.seat.exchange";
    public static final String RESERVE_SEAT_ROUTING_KEY = "reserve.seat.routing.key";

    public static final String UPDATE_FLIGHT_STATUS_EXCHANGE = "update.flight.status.exchange";
    public static final String UPDATE_FLIGHT_STATUS_ROUTING_KEY = "update.flight.status.routing.key";

    public static final String ROLLBACK_FLIGHT_STATUS_EXCHANGE = "rollback.flight.status.exchange";
    public static final String ROLLBACK_FLIGHT_STATUS_ROUTING_KEY = "rollback.flight.status.routing.key";

    public static final String UPDATE_RESERVE_EXCHANGE = "update.reserve.exchange";
    public static final String UPDATE_RESERVE_ROUTING_KEY = "update.reserve.routing.key";

    public static final String RESERVE_STATUS_UPDATE_EXCHANGE = "reserve.status.update.exchange";
    public static final String RESERVE_STATUS_UPDATE_ROUTING_KEY = "reserve.status.update.routing.key";

    public static final String ROLLBACK_UPDATE_FLIGHT_EXCHANGE = "rollback.update.flight.exchange";
    public static final String ROLLBACK_UPDATE_FLIGHT_ROUTING_KEY= "rollback.update.flight.routing.key";

    public static final String REGISTER_RESERVE_EXCHANGE = "register.reserve.exchange";
    public static final String REGISTER_RESERVE_ROUTING_KEY = "register.reserve.routing.key";

    public static final String DEBIT_SEAT_EXCHANGE = "debit.seat.exchange";
    public static final String DEBIT_SEAT_ROUTING_KEY = "debit.seat.routing.key";

    public static final String ROLLBACK_RESERVE_SEAT_EXCHANGE = "rollback.debit.seat.exchange";
    public static final String ROLLBACK_RESERVE_SEAT_ROUTING_KEY = "rollback.debit.seat.routing.key";

    public static final String ROLLBACK_REGISTER_RESERVE_EXCHANGE = "rollback.register.reserve.exchange";
    public static final String ROLLBACK_REGISTER_RESERVE_ROUTING_KEY = "rollback.register.reserve.routing.key";

    public static final String CREATE_EMPLOYEE_EXCHANGE = "create.employee.exchange";
    public static final String CREATE_EMPLOYEE_ROUTING_KEY = "create.employee.routing.key";

    public static final String ROLLBACK_CREATE_EMPLOYEE_EXCHANGE = "rollback.create.employee.exchange";
    public static final String ROLLBACK_CREATE_EMPLOYEE_ROUTING_KEY = "rollback.create.employee.routing.key";

    public static final String UPDATE_EMPLOYEE_EXCHANGE = "update.employee.exchange";
    public static final String UPDATE_EMPLOYEE_ROUTING_KEY = "update.employee.routing.key";

    public static final String DELETE_EMPLOYEE_EXCHANGE = "delete.employee.exchange";
    public static final String DELETE_EMPLOYEE_ROUTING_KEY = "delete.employee.routing.key";

    public static final String DELETE_AUTH_EXCHANGE = "delete.auth.exchange";
    public static final String DELETE_AUTH_ROUTING_KEY = "delete.auth.routing.key";
  
    public static final String REFUND_MILES_EXCHANGE = "refund.miles.exchange";
    public static final String REFUND_MILES_ROUTING_KEY = "refund.miles.routing.key";

    public static final String ROLLBACK_RESERVE_STATUS_UPDATE_EXCHANGE = "rollback.reserve.status.update.exchange";
    public static final String ROLLBACK_RESERVE_STATUS_UPDATE_ROUTING_KEY = "rollback.reserve.status.update.routing.key";

    public static final String GET_MILES_EXCHANGE = "get.miles.exchange";
    public static final String GET_MILES_ROUTING_KEY = "get.miles.routing.key";

    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        Jackson2JsonMessageConverter converter = new Jackson2JsonMessageConverter();
        return converter;
    }

}
