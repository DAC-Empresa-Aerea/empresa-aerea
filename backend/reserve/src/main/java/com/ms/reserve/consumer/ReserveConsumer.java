package com.ms.reserve.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ms.reserve.config.RabbitMQConfig;
import com.ms.reserve.dto.error.SagaResponse;
import com.ms.reserve.dto.reserve.register.RegisterReserveRequestDTO;
import com.ms.reserve.dto.reserve.register.RegisterReserveResponseDTO;
import com.ms.reserve.exception.BusinessException;
import com.ms.reserve.service.ReserveService;

@Component
public class ReserveConsumer {
    
    @Autowired
    private ReserveService reserveService;

    @RabbitListener(queues = RabbitMQConfig.REGISTER_RESERVE_QUEUE)
    public SagaResponse<RegisterReserveResponseDTO> receiveRegisterReserve(RegisterReserveRequestDTO dto) {
        try {
            return SagaResponse.success(reserveService.create(dto));
        } catch (BusinessException e) {
            return SagaResponse.error(e.getMessage(), e.getCode(), e.getStatus());
        } catch (Exception e) {
            return SagaResponse.error("REGISTER_RESERVE_ERROR", e.getMessage(), 500);
        }
    }

    @RabbitListener(queues = RabbitMQConfig.ROLLBACK_REGISTER_RESERVE_QUEUE)
    public void receiveRollbackRegisterReserve(String reserveCode) {
        try {
            reserveService.rollbackRegister(reserveCode);
        } catch (BusinessException e) {
            throw new RuntimeException(e.getMessage(), e);
        } catch (Exception e) {
            throw new RuntimeException("ROLLBACK_REGISTER_RESERVE_ERROR", e);
        }
    }
    
}
