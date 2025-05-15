package com.ms.employee.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.validation.Validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.beans.BeanUtils;

import com.ms.employee.dto.employee.EmployeeRequestDTO;
import com.ms.employee.dto.employee.EmployeeResponseDTO;
import com.ms.employee.dto.employee.update.UpdateEmployeeRequestDTO;
import com.ms.employee.dto.employee.update.UpdateEmployeeResponseDTO;
import com.ms.employee.exception.BusinessException;
import com.ms.employee.model.Employee;
import com.ms.employee.repository.EmployeeRepository;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private Validator validator;

    public EmployeeResponseDTO create(EmployeeRequestDTO employee) {
        Set<ConstraintViolation<EmployeeRequestDTO>> violations = validator.validate(employee);

        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }

        if(employeeRepository.existsByEmail(employee.getEmail())) {
            throw new BusinessException("EMAIL_ALREADY_EXISTS", "Email já existe.", HttpStatus.CONFLICT.value());
        }

        if(employeeRepository.existsByCpf(employee.getCpf())) {
            throw new BusinessException("CPF_ALREADY_EXISTS", "CPF já existe.", HttpStatus.CONFLICT.value());
        }

        Employee employeeEntity = new Employee();
        BeanUtils.copyProperties(employee, employeeEntity);
        employeeEntity.setActive(true);

        Employee savedEmployee = employeeRepository.save(employeeEntity);

        EmployeeResponseDTO employeeCreated = new EmployeeResponseDTO();
        BeanUtils.copyProperties(savedEmployee, employeeCreated);

        return employeeCreated;
    }
    
    public List<EmployeeResponseDTO> getAllActiveEmployees() {
        return employeeRepository.findAll().stream()
        .filter(employee -> employee.isActive())
        .map(employee -> {
            EmployeeResponseDTO dto = new EmployeeResponseDTO();
            BeanUtils.copyProperties(employee, dto);
            return dto;
        })
        .collect(Collectors.toList());
    }

    public UpdateEmployeeResponseDTO updateEmployee(Long id, UpdateEmployeeRequestDTO employee) {
        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new BusinessException("EMPLOYEE_NOT_FOUND", "Funcionário não encontrado.", HttpStatus.NOT_FOUND.value()));

        if(!existingEmployee.isActive()) {
            throw new BusinessException("EMPLOYEE_NOT_ACTIVE", "Funcionário não está ativo.", HttpStatus.BAD_REQUEST.value());
        }    
        
        String oldEmail = existingEmployee.getEmail();

        existingEmployee.setEmail(employee.getEmail());
        existingEmployee.setName(employee.getName());
        existingEmployee.setPhoneNumber(employee.getPhoneNumber());

        Employee updatedEmployee = employeeRepository.save(existingEmployee);

        UpdateEmployeeResponseDTO updateEmployeeResponseDTO = new UpdateEmployeeResponseDTO();
        updateEmployeeResponseDTO.setId(updatedEmployee.getId());
        updateEmployeeResponseDTO.setCpf(updatedEmployee.getCpf());
        updateEmployeeResponseDTO.setEmail(updatedEmployee.getEmail());
        updateEmployeeResponseDTO.setName(updatedEmployee.getName());
        updateEmployeeResponseDTO.setPhoneNumber(updatedEmployee.getPhoneNumber());
        updateEmployeeResponseDTO.setOldEmail(oldEmail);

        return updateEmployeeResponseDTO;
    }
    
    public EmployeeResponseDTO deactivateEmployee(Long id) {
        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new BusinessException("EMPLOYEE_NOT_FOUND", "Funcionário não encontrado.", HttpStatus.NOT_FOUND.value()));

        if (!existingEmployee.isActive()) {
            throw new BusinessException("EMPLOYEE_ALREADY_DEACTIVATED", "Funcionário já está desativado.", HttpStatus.BAD_REQUEST.value());
        }

        
        Long activeEmployeesCount = employeeRepository.countByActiveTrue();
        if (activeEmployeesCount <= 1) {
            throw new BusinessException("LAST_ACTIVE_EMPLOYEE", "Não é possível desativar o último funcionário ativo.", HttpStatus.BAD_REQUEST.value());
        }

        existingEmployee.setActive(false);
        Employee updatedEmployee = employeeRepository.save(existingEmployee);
        EmployeeResponseDTO dto = new EmployeeResponseDTO();
        BeanUtils.copyProperties(updatedEmployee, dto);
        return dto;
    }

    // Usado para rollback de criação (não excluir)
    public void deleteById(Long id) {
        employeeRepository.deleteById(id);
    }

}
