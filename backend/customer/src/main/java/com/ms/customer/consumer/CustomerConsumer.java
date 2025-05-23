package com.ms.customer.consumer;

import java.util.List;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import com.ms.customer.config.RabbitMQConfig;
import com.ms.customer.dto.customer.CustomerRequestDTO;
import com.ms.customer.dto.customer.CustomerResponseDTO;
import com.ms.customer.dto.debitSeat.DebitSeatRequestDTO;
import com.ms.customer.dto.debitSeat.DebitSeatResponseDTO;
import com.ms.customer.dto.error.SagaResponse;
import com.ms.customer.dto.getMiles.GetMilesRequestDTO;
import com.ms.customer.dto.getMiles.GetMilesResponseDTO;
import com.ms.customer.dto.refundMiles.RefundMilesRequestDTO;
import com.ms.customer.exception.BusinessException;
import com.ms.customer.service.CustomerService;

import jakarta.validation.Valid;

@Component
public class CustomerConsumer {

    @Autowired
    private CustomerService customerService;

    @RabbitListener(queues = RabbitMQConfig.CREATE_CUSTOMER_QUEUE)
    public SagaResponse<CustomerResponseDTO> receiveCreateCustomer (@Payload @Valid CustomerRequestDTO customer) {
        try {
            return SagaResponse.success(customerService.create(customer));
        } catch (BusinessException e) {
            return SagaResponse.error(e.getCode(), e.getMessage(), e.getStatus());
        } catch (Exception e) {
            return SagaResponse.error("CREATE_CUSTOMER_ERROR", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
        }
    }

    @RabbitListener(queues = RabbitMQConfig.DEBIT_SEAT_QUEUE)
    public SagaResponse<DebitSeatResponseDTO> receiveDebitSeat(@Payload @Valid DebitSeatRequestDTO customer) {
        try {
            return SagaResponse.success(customerService.debitSeat(customer));
        } catch (BusinessException e) {
            return SagaResponse.error(e.getCode(), e.getMessage(), e.getStatus());
        } catch (Exception e) {
            return SagaResponse.error("DEBIT_SEAT_ERROR", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
        }
    }

    @RabbitListener(queues = RabbitMQConfig.ROLLBACK_CUSTOMER_QUEUE)
    public void receiveRollbackCustomer(@Payload Long customerId) {
        customerService.deleteById(customerId);
    }

    @RabbitListener(queues = RabbitMQConfig.REFUND_MILES_QUEUE)
    public SagaResponse<List<RefundMilesRequestDTO>> receiveRefundMiles(@Payload List<RefundMilesRequestDTO> dto) {
        try {
            return SagaResponse.success(customerService.refundMiles(dto));
        }
        catch (BusinessException e) {
            throw new BusinessException(e.getCode(), e.getMessage(), e.getStatus());
        } catch (Exception e) {
            throw new BusinessException("REFUND_MILES_ERROR", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
        }
    }

    @RabbitListener(queues = RabbitMQConfig.GET_MILES_QUEUE)
    public SagaResponse<GetMilesResponseDTO> receiveGetMiles(@Payload GetMilesRequestDTO customer) {
        try {
            return SagaResponse.success(customerService.getMilesById(customer.getCustomerCode()));
        } catch (BusinessException e) {
            return SagaResponse.error(e.getCode(), e.getMessage(), e.getStatus());
        } catch (Exception e) {
            return SagaResponse.error("GET_MILES_ERROR", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
        }
    }
    
}
