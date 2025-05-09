package com.ms.saga.producer;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;

import com.ms.saga.config.RabbitMQConfig;
import com.ms.saga.dto.customer.CustomerRequestDTO;
import com.ms.saga.dto.customer.CustomerResponseDTO;
import com.ms.saga.dto.customer.debitSeat.DebitSeatRequestDTO;
import com.ms.saga.dto.customer.debitSeat.DebitSeatResponseDTO;
import com.ms.saga.dto.error.SagaResponse;

@Component
public class CustomerProducer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public SagaResponse<CustomerResponseDTO> sendCreateCustomer(CustomerRequestDTO dto) {
        return rabbitTemplate.convertSendAndReceiveAsType(
            RabbitMQConfig.CREATE_CUSTOMER_EXCHANGE,
            RabbitMQConfig.CREATE_CUSTOMER_ROUTING_KEY,
            dto,
            new ParameterizedTypeReference<SagaResponse<CustomerResponseDTO>>() {}
        );
    }

    public void sendRollbackCreateCustomer(Long customerId) {
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.ROLLBACK_CUSTOMER_EXCHANGE,
            RabbitMQConfig.ROLLBACK_CUSTOMER_ROUTING_KEY,
            customerId
        );
    }

    public SagaResponse<DebitSeatResponseDTO> sendSeatDebit(DebitSeatRequestDTO debitRequest) {
        return rabbitTemplate.convertSendAndReceiveAsType(
            RabbitMQConfig.DEBIT_SEAT_EXCHANGE,
            RabbitMQConfig.DEBIT_SEAT_ROUTING_KEY,
            debitRequest,
            new ParameterizedTypeReference<SagaResponse<DebitSeatResponseDTO>>() {}
        );
        
    }

    public void sendRollbackSeatDebit() {
        
    }

}

