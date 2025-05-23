package com.ms.reserve.consumer;

import java.util.List;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ms.reserve.config.RabbitMQConfig;
import com.ms.reserve.dto.error.SagaResponse;
import com.ms.reserve.dto.reserve.register.RegisterReserveRequestDTO;
import com.ms.reserve.dto.reserve.register.RegisterReserveResponseDTO;
import com.ms.reserve.dto.status.FlightStatusDTO;
import com.ms.reserve.dto.status.UpdatedReserveStatusDTO;
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
    public void receiveRollbackRegisterReserve(RegisterReserveResponseDTO reserve) {
        try {
            reserveService.rollbackRegister(reserve.getReserveCode());
        } catch (BusinessException e) {
            throw new RuntimeException(e.getMessage(), e);
        } catch (Exception e) {
            throw new RuntimeException("ROLLBACK_REGISTER_RESERVE_ERROR", e);
        }
    }

    @RabbitListener(queues = RabbitMQConfig.RESERVE_STATUS_UPDATE_QUEUE)
    public SagaResponse<List<UpdatedReserveStatusDTO>> updateStatus(FlightStatusDTO dto) {
        try {
            return SagaResponse.success(reserveService.updateStatusReserveWithFlightCode(dto));
        }
        catch (BusinessException e) {
            return SagaResponse.error(e.getMessage(), e.getCode(), e.getStatus());
        } catch (Exception e) {
            return SagaResponse.error("UPDATE_RESERVE_ERROR", e.getMessage(), 500);
        }
    }

    @RabbitListener(queues = RabbitMQConfig.ROLLBACK_RESERVE_STATUS_QUEUE)
    public void rollbackStatus(FlightStatusDTO dto) {
        try {
            reserveService.rollbackStatusReserveWithFlightCode(dto);
        } catch (BusinessException e) {
            throw new RuntimeException(e.getMessage(), e);
        } catch (Exception e) {
            throw new RuntimeException("ROLLBACK_RESERVE_STATUS_ERROR", e);
        }
    }
    
}
