package com.ms.customer.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import com.ms.customer.dto.customer.CustomerRequestDTO;
import com.ms.customer.dto.customer.CustomerResponseDTO;
import com.ms.customer.service.CustomerService;

import jakarta.validation.Valid;

@Component
public class CreateCustomerConsumer {

    @Autowired
    private CustomerService customerService;

    @RabbitListener(queues = "create.customer.queue")
    public CustomerResponseDTO receiveCreateCustomer (@Payload @Valid CustomerRequestDTO customer) {
        return customerService.create(customer);
    }
}
