package com.ms.saga.producer;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;

import com.ms.saga.config.RabbitMQConfig;
import com.ms.saga.dto.employee.EmployeeRequestDTO;
import com.ms.saga.dto.employee.EmployeeResponseDTO;
import com.ms.saga.dto.error.SagaResponse;

@Component
public class EmployeeProducer {
    
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    public SagaResponse<EmployeeResponseDTO> sendCreateEmployee(EmployeeRequestDTO dto) {
        return rabbitTemplate.convertSendAndReceiveAsType(
            RabbitMQConfig.CREATE_EMPLOYEE_EXCHANGE,
            RabbitMQConfig.CREATE_EMPLOYEE_ROUTING_KEY,
            dto,
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
    
}
