package com.ms.customer.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import com.ms.customer.config.RabbitMQConfig;
import com.ms.customer.dto.customer.CustomerRequestDTO;
import com.ms.customer.dto.customer.CustomerResponseDTO;
import com.ms.customer.dto.error.SagaResponse;
import com.ms.customer.service.CustomerService;

import jakarta.validation.Valid;

@Component
public class CreateCustomerConsumer {

    @Autowired
    private CustomerService customerService;

    @RabbitListener(queues = RabbitMQConfig.CREATE_CUSTOMER_QUEUE)
    public SagaResponse<CustomerResponseDTO> receiveCreateCustomer (@Payload @Valid CustomerRequestDTO customer) {
        if (customerService.emailExists(customer.getEmail())) {
            return SagaResponse.error("EMAIL_ALREADY_EXISTS", "Email já existe.", HttpStatus.CONFLICT.value());
        }

        if (customerService.cpfExists(customer.getCpf())) {
            return SagaResponse.error("CPF_ALREADY_EXISTS", "CPF já existe.", HttpStatus.CONFLICT.value());
        }

        return SagaResponse.success(customerService.create(customer));
    }

    @RabbitListener(queues = RabbitMQConfig.ROLLBACK_CUSTOMER_QUEUE)
    public void receiveRollbackCustomer(@Payload Long customerId) {
        customerService.deleteById(customerId);
    }
}
