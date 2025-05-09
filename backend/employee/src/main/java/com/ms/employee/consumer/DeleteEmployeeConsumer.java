package com.ms.employee.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import com.ms.employee.config.RabbitMQConfig;
import com.ms.employee.dto.error.SagaResponse;
import com.ms.employee.exception.BusinessException;
import com.ms.employee.service.EmployeeService;

@Component
public class DeleteEmployeeConsumer {

    @Autowired
    private EmployeeService employeeService;
    
    @RabbitListener(queues = RabbitMQConfig.DELETE_EMPLOYEE_QUEUE)
    public SagaResponse<Void> receiveDeleteEmployee(@Payload Long employeeId) {
        try {
            employeeService.deleteEmployee(employeeId);
            return SagaResponse.success(null);
        } catch (BusinessException e) {
            return SagaResponse.error(e.getCode(), e.getMessage(), e.getStatus());
        } catch (Exception e) {
            return SagaResponse.error("INTERNAL_SERVER_ERROR", "Erro interno no servidor.", HttpStatus.INTERNAL_SERVER_ERROR.value());
        }
    }
}