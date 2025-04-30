package com.ms.employee.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import com.ms.employee.config.RabbitMQConfig;
import com.ms.employee.dto.employee.EmployeeRequestDTO;
import com.ms.employee.dto.employee.EmployeeResponseDTO;
import com.ms.employee.dto.error.ErrorDTO;
import com.ms.employee.dto.error.SagaResponse;
import com.ms.employee.service.EmployeeService;

import jakarta.validation.Valid;

@Component
public class CreateEmployeeConsumer {

    @Autowired
    private EmployeeService employeeService;
    
    @RabbitListener(queues = RabbitMQConfig.CREATE_EMPLOYEE_QUEUE)
    public SagaResponse<EmployeeResponseDTO> receiveCreateEmployee (@Payload @Valid EmployeeRequestDTO employee) {
        if (employeeService.emailExists(employee.getEmail())) {
            return new SagaResponse<>(false, null, new ErrorDTO("EMAIL_ALREADY_EXISTS", "Email já existe."));
        }

        if (employeeService.cpfExists(employee.getCpf())) {
            return new SagaResponse<>(false, null, new ErrorDTO("CPF_ALREADY_EXISTS", "CPF já existe."));
        }

        return new SagaResponse<>(true, employeeService.create(employee), null);
    }

    @RabbitListener(queues = RabbitMQConfig.ROLLBACK_EMPLOYEE_QUEUE)
    public void receiveRollbackEmployee(@Payload Long employeeId) {
        employeeService.deleteById(employeeId);
    }
}
