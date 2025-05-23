package com.ms.reserve.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ms.reserve.config.RabbitMQConfig;
import com.ms.reserve.dto.error.SagaResponse;
import com.ms.reserve.dto.reserve.ReserveResponseDTO;
import com.ms.reserve.dto.reserve.cancel.ReserveCancelRequestDTO;
import com.ms.reserve.dto.reserve.cancel.ReserveCancelResponseDTO;
import com.ms.reserve.dto.reserve.register.RegisterReserveRequestDTO;
import com.ms.reserve.dto.reserve.register.RegisterReserveResponseDTO;
import com.ms.reserve.dto.status.FlightStatusDTO;
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

    @RabbitListener(queues = RabbitMQConfig.RESERVE_STATUS_UPDATED_QUEUE)
    public SagaResponse<String> updateStatus(FlightStatusDTO dto) {
        try {
            reserveService.updateStatusReserveWithFlightCode(dto);
            return SagaResponse.success("UPDATE_RESERVER_SUCESS");
        }
        catch (BusinessException e) {
            return SagaResponse.error(e.getMessage(), e.getCode(), e.getStatus());
        } catch (Exception e) {
            return SagaResponse.error("UPDATE_RESERVE_ERROR", e.getMessage(), 500);
        }
    }

    @RabbitListener(queues = RabbitMQConfig.GET_RESERVE_QUEUE)
    public SagaResponse<ReserveCancelResponseDTO> searchReserve(ReserveCancelRequestDTO dto) {
        String reserveId = dto.getReservaId();
        System.out.println("Entrou no consumer: " + reserveId);
        if (reserveId == null || reserveId.isEmpty()) {
            return SagaResponse.error("RESERVE_ID_NOT_FOUND", "ReservaId não pode ser nulo ou vazio", 400);
        }
        try {
            ReserveResponseDTO reserve = reserveService.getReserveById(reserveId);
            
            // Converter ReserveResponseDTO → ReserveCancelResponseDTO o service retorna ReserveResponseDTO
            // e o consumer espera ReserveCancelResponseDTO
            ReserveCancelResponseDTO response = new ReserveCancelResponseDTO();
            BeanUtils.copyProperties(reserve, response);
            response.setCode(reserve.getCode());
            
            return SagaResponse.success(response);
        } catch (BusinessException e) {
            return SagaResponse.error(e.getMessage(), e.getCode(), e.getStatus());
        } catch (Exception e) {
            return SagaResponse.error("GET_RESERVE_ERROR", e.getMessage(), 400);
        }
    }

    @RabbitListener(queues = RabbitMQConfig.CANCEL_RESERVE_QUEUE)
    public SagaResponse<ReserveCancelResponseDTO> cancelReserve(ReserveCancelRequestDTO dto) {
        try {
            // 1. Validar entrada
            if (dto.getReservaId() == null || dto.getReservaId().isEmpty()) {
                return SagaResponse.error("ID da reserva é obrigatório", "INVALID_INPUT", 400);
            }

            // 2. Buscar reserva para verificar se existe
            ReserveResponseDTO reserve = reserveService.getReserveById(dto.getReservaId());
            
            // 3. Atualizar status para CANCELADA
            ReserveResponseDTO updatedReserve = reserveService.cancelReserve(dto.getReservaId());

            // 4. Preparar resposta
            ReserveCancelResponseDTO response = new ReserveCancelResponseDTO();
            BeanUtils.copyProperties(updatedReserve, response);
            response.setCode(updatedReserve.getCode());

            return SagaResponse.success(response);
        } catch (BusinessException e) {
            return SagaResponse.error(e.getMessage(), e.getCode(), e.getStatus());
        } catch (Exception e) {
            return SagaResponse.error(
                "Erro ao cancelar reserva: " + e.getMessage(),
                "CANCEL_RESERVE_ERROR",
                500
            );
        }
    }
    
}
