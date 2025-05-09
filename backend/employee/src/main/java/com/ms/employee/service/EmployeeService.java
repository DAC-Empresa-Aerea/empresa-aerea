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
import com.ms.employee.exception.BusinessException;
import com.ms.employee.model.Employee;
import com.ms.employee.repository.EmployeeRepository;

import jakarta.persistence.EntityNotFoundException;
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
        .filter(Employee::getActive)
        .map(employee -> {
            EmployeeResponseDTO dto = new EmployeeResponseDTO();
            BeanUtils.copyProperties(employee, dto);
            return dto;
        })
        .collect(Collectors.toList());
    }
    
    public EmployeeResponseDTO findById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Funcionário com ID " + id + " não encontrado."));
        return convertToEmployeeResponseDTO(employee);
    }

    public EmployeeResponseDTO updateEmployee(Long id, EmployeeRequestDTO employee) {
        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Funcionário com ID " + id + " não encontrado."));

        existingEmployee.setCpf(employee.getCpf());
        existingEmployee.setEmail(employee.getEmail());
        existingEmployee.setName(employee.getName());
        existingEmployee.setPhoneNumber(employee.getPhoneNumber());

        Employee updatedEmployee = employeeRepository.save(existingEmployee);

        return convertToEmployeeResponseDTO(updatedEmployee);
    }
    
    public void deleteEmployee(Long id) {
        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Funcionário com ID " + id + " não encontrado."));
        employeeRepository.delete(existingEmployee);
    }

    private EmployeeResponseDTO convertToEmployeeResponseDTO(Employee employee) {
        EmployeeResponseDTO dto = new EmployeeResponseDTO();
        dto.setId(employee.getId());
        dto.setCpf(employee.getCpf());
        dto.setEmail(employee.getEmail());
        dto.setName(employee.getName());
        dto.setPhoneNumber(employee.getPhoneNumber());
        return dto;
    }

    public void deleteById(Long id) {
        employeeRepository.deleteById(id);
    }

}
