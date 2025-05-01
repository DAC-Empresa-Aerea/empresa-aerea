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
import com.ms.employee.util.ValidationUtil;

import jakarta.validation.ConstraintViolationException;

@Component
public class UpdateEmployeeConsumer {

    @Autowired
    private EmployeeService employeeService;
    
    @RabbitListener(queues = RabbitMQConfig.UPDATE_EMPLOYEE_QUEUE)
    public SagaResponse<EmployeeResponseDTO> receiveUpdateEmployee(@Payload UpdateEmployeeWrapper wrapper) {
        try {
            Long employeeId = wrapper.getEmployeeId();
            EmployeeRequestDTO employee = wrapper.getEmployee();
            
            return SagaResponse.success(employeeService.updateEmployee(employeeId, employee));
        } catch (ConstraintViolationException e) {
            String errors = ValidationUtil.extractMessages(e);
            return SagaResponse.error("VALIDATION_ERROR", errors, HttpStatus.BAD_REQUEST.value());
        } catch (BusinessException e) {
            return SagaResponse.error(e.getCode(), e.getMessage(), e.getStatus());
        } catch (Exception e) {
            return SagaResponse.error("INTERNAL_SERVER_ERROR", "Erro interno no servidor.", HttpStatus.INTERNAL_SERVER_ERROR.value());
        }
    }
    
    public static class UpdateEmployeeWrapper {
        private Long employeeId;
        private EmployeeRequestDTO employee;

        public UpdateEmployeeWrapper() {}

        public Long getEmployeeId() {
            return employeeId;
        }

        public void setEmployeeId(Long employeeId) {
            this.employeeId = employeeId;
        }

        public EmployeeRequestDTO getEmployee() {
            return employee;
        }

        public void setEmployee(EmployeeRequestDTO employee) {
            this.employee = employee;
        }
    }
}