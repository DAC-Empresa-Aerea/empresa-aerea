package com.ms.employee.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import com.ms.employee.config.RabbitMQConfig;
import com.ms.employee.dto.employee.EmployeeRequestDTO;
import com.ms.employee.dto.employee.EmployeeResponseDTO;
import com.ms.employee.dto.error.SagaResponse;
import com.ms.employee.exception.BusinessException;
import com.ms.employee.service.EmployeeService;

import jakarta.validation.Valid;

@Component
public class CreateEmployeeConsumer {

    @Autowired
    private EmployeeService employeeService;
    
    @RabbitListener(queues = RabbitMQConfig.CREATE_EMPLOYEE_QUEUE)
    public SagaResponse<EmployeeResponseDTO> receiveCreateEmployee (@Payload @Valid EmployeeRequestDTO employee) {
        try {
            return SagaResponse.success(employeeService.create(employee));
        } catch (BusinessException e) {
            return SagaResponse.error(e.getCode(), e.getMessage(), e.getStatus());
        } catch (Exception e) {
            return SagaResponse.error("INTERNAL_SERVER_ERROR", "Erro interno no servidor.", HttpStatus.INTERNAL_SERVER_ERROR.value());
        }
    }

    @RabbitListener(queues = RabbitMQConfig.ROLLBACK_CREATE_EMPLOYEE_QUEUE)
    public void receiveRollbackEmployee(@Payload Long employeeId) {
        employeeService.deleteById(employeeId);
    }
}
