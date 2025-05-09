package com.ms.saga.producer;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;

import com.ms.saga.config.RabbitMQConfig;
import com.ms.saga.dto.employee.EmployeeRequestDTO;
import com.ms.saga.dto.employee.EmployeeResponseDTO;
import com.ms.saga.dto.employee.EmployeeUpdateRequestDTO;
import com.ms.saga.dto.error.SagaResponse;

@Component
public class EmployeeProducer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public SagaResponse<EmployeeResponseDTO> sendCreateEmployee(EmployeeRequestDTO employee) {
        return rabbitTemplate.convertSendAndReceiveAsType(
            RabbitMQConfig.CREATE_EMPLOYEE_EXCHANGE,
            RabbitMQConfig.CREATE_EMPLOYEE_ROUTING_KEY,
            employee,
            new ParameterizedTypeReference<SagaResponse<EmployeeResponseDTO>>() {}
        );
    }

    public void sendRollbackCreateEmployee(Long employeeId) {
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.ROLLBACK_CREATE_EMPLOYEE_EXCHANGE,
            RabbitMQConfig.ROLLBACK_CREATE_EMPLOYEE_ROUTING_KEY,
            employeeId
        );
    }

    public SagaResponse<EmployeeResponseDTO> sendUpdateEmployee(Long id, EmployeeUpdateRequestDTO employee) {
        employee.setId(id);

        return rabbitTemplate.convertSendAndReceiveAsType(
            RabbitMQConfig.UPDATE_EMPLOYEE_EXCHANGE,
            RabbitMQConfig.UPDATE_EMPLOYEE_ROUTING_KEY,
            employee,
            new ParameterizedTypeReference<SagaResponse<EmployeeResponseDTO>>() {}
        );
    }

    public SagaResponse<Void> sendDeleteEmployee(Long employeeId) {
        return rabbitTemplate.convertSendAndReceiveAsType(
            RabbitMQConfig.DELETE_EMPLOYEE_EXCHANGE,
            RabbitMQConfig.DELETE_EMPLOYEE_ROUTING_KEY,
            employeeId,
            new ParameterizedTypeReference<SagaResponse<Void>>() {}
        );
    }

}
