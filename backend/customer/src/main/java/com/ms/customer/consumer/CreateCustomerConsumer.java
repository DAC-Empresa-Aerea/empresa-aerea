package com.ms.customer.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import com.ms.customer.dto.customer.CustomerRequestDTO;
import com.ms.customer.dto.customer.CustomerResponseDTO;
import com.ms.customer.dto.error.ErrorDTO;
import com.ms.customer.dto.error.SagaResponse;
import com.ms.customer.service.CustomerService;

import jakarta.validation.Valid;

@Component
public class CreateCustomerConsumer {

    @Autowired
    private CustomerService customerService;

    @RabbitListener(queues = "create.customer.queue")
    public SagaResponse<CustomerResponseDTO> receiveCreateCustomer (@Payload @Valid CustomerRequestDTO customer) {
        if (customerService.emailExists(customer.getEmail())) {
            return new SagaResponse<>(false, null, new ErrorDTO("EMAIL_ALREADY_EXISTS", "Email já existe."));
        }

        if (customerService.cpfExists(customer.getCpf())) {
            return new SagaResponse<>(false, null, new ErrorDTO("CPF_ALREADY_EXISTS", "CPF já existe."));
        }

        return new SagaResponse<>(true, customerService.create(customer), null);
    }

    @RabbitListener(queues = "rollback.customer.queue")
    public void receiveRollbackCustomer(@Payload Long customerId) {
        customerService.deleteById(customerId);
    }
}
