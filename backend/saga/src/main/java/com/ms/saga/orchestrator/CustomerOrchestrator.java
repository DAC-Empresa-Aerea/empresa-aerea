package com.ms.saga.orchestrator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ms.saga.dto.Roles;
import com.ms.saga.dto.auth.create.CreateAuthRequestDTO;
import com.ms.saga.dto.auth.create.CreateAuthResponseDTO;
import com.ms.saga.dto.customer.CustomerRequestDTO;
import com.ms.saga.dto.customer.CustomerResponseDTO;
import com.ms.saga.dto.error.ErrorDTO;
import com.ms.saga.dto.error.SagaResponse;
import com.ms.saga.exception.ResourceConflictException;
import com.ms.saga.producer.AuthProducer;
import com.ms.saga.producer.CustomerProducer;

@Component
public class CustomerOrchestrator {
    
    @Autowired
    private CustomerProducer customerProducer;

    @Autowired
    private AuthProducer authProducer;

    public CustomerResponseDTO processRegisterCustomer(CustomerRequestDTO customerRequest) {
        SagaResponse<CustomerResponseDTO> customerResponse = customerProducer.sendCreateCustomer(customerRequest);

        if (!customerResponse.isSuccess()) {
            ErrorDTO error = customerResponse.getError();
            throw new ResourceConflictException(error.getCode(), error.getMessage());
        }

        SagaResponse<CreateAuthResponseDTO> authResponse = authProducer.sendCreateAuth(
            new CreateAuthRequestDTO(customerRequest.getEmail(), Roles.CUSTOMER)
        );

        if (!authResponse.isSuccess()) {
            customerProducer.sendRollbackCustomer(customerResponse.getData().getCodigo());

            ErrorDTO error = authResponse.getError();
            throw new ResourceConflictException(error.getCode(), error.getMessage());
        }

        return customerResponse.getData();
    }

}