package com.ms.saga.orchestrator;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ms.saga.dto.Roles;
import com.ms.saga.dto.auth.create.CreateAuthRequestDTO;
import com.ms.saga.dto.auth.create.CreateAuthResponseDTO;
import com.ms.saga.dto.auth.delete.DeleteAuthRequestDTO;
import com.ms.saga.dto.auth.update.UpdateAuthDTO;
import com.ms.saga.dto.employee.EmployeeRequestDTO;
import com.ms.saga.dto.employee.EmployeeResponseDTO;
import com.ms.saga.dto.employee.update.EmployeeUpdateRequestDTO;
import com.ms.saga.dto.employee.update.EmployeeUpdateResponseDTO;
import com.ms.saga.dto.error.ErrorDTO;
import com.ms.saga.dto.error.SagaResponse;
import com.ms.saga.exception.BusinessException;
import com.ms.saga.producer.AuthProducer;
import com.ms.saga.producer.EmployeeProducer;

@Component
public class EmployeeOrchestrator {

    @Autowired
    private AuthProducer authProducer;

    @Autowired
    private EmployeeProducer employeeProducer;


    public EmployeeResponseDTO processRegisterEmployee(EmployeeRequestDTO employeeRequest) {
        SagaResponse<EmployeeResponseDTO> employeeResponse = employeeProducer.sendCreateEmployee(employeeRequest);

        if (!employeeResponse.isSuccess()) {
            ErrorDTO error = employeeResponse.getError();
            throw new BusinessException(error);
        }

        SagaResponse<CreateAuthResponseDTO> authResponse = authProducer.sendCreateAuth(
            new CreateAuthRequestDTO(employeeRequest.getEmail(), Roles.EMPLOYEE)
        );

        if (!authResponse.isSuccess()) {
            employeeProducer.sendRollbackCreateEmployee(employeeResponse.getData().getId());

            ErrorDTO error = authResponse.getError();
            throw new BusinessException(error);
        }

        return employeeResponse.getData();
    }
    
    public EmployeeResponseDTO processUpdateEmployee(Long employeeId, EmployeeUpdateRequestDTO employeeRequest) {
        SagaResponse<EmployeeUpdateResponseDTO> employeeResponse = employeeProducer.sendUpdateEmployee(employeeId, employeeRequest);
        
        if (!employeeResponse.isSuccess()) {
            ErrorDTO error = employeeResponse.getError();
            throw new BusinessException(error);
        }

        SagaResponse<UpdateAuthDTO> authResponse = authProducer.sendUpdateAuth(
            new UpdateAuthDTO(employeeResponse.getData().getEmail(), employeeResponse.getData().getOldEmail(), Roles.EMPLOYEE)
        );

        if(!authResponse.isSuccess()) {
            //employeeProducer.sendRollbackUpdateEmployee(employeeId);

            ErrorDTO error = authResponse.getError();
            throw new BusinessException(error);
        }

        EmployeeResponseDTO employeeResponseDTO = new EmployeeResponseDTO();
        BeanUtils.copyProperties(employeeResponse.getData(), employeeResponseDTO);
        
        return employeeResponseDTO;
    }
    
    public EmployeeResponseDTO processDeleteEmployee(Long employeeId) {
        SagaResponse<EmployeeResponseDTO> employeeResponse = employeeProducer.sendDeleteEmployee(employeeId);

        if (!employeeResponse.isSuccess()) {
            ErrorDTO error = employeeResponse.getError();
            throw new BusinessException(error);
        }

        authProducer.sendDeleteAuth(
            new DeleteAuthRequestDTO(employeeResponse.getData().getEmail(), Roles.EMPLOYEE)
        );

        return employeeResponse.getData();
    }
}
