package com.ms.employee.service;

import java.util.List;
import java.util.Set;

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

    //#region Método para criar um funcionário
    /**
     * Cria um novo funcionário e o salva no repositório.
     *
     * @param employee O objeto EmployeeRequestDTO contendo os detalhes do funcionário a ser criado.
     *                 Deve incluir valores não nulos e não vazios para CPF, email, nome e telefone.
     * @return O objeto EmployeeResponseDTO representando o funcionário recém-criado após ser salvo no repositório.
     * @throws IllegalArgumentException se qualquer campo obrigatório (CPF, email, nome ou telefone) for nulo ou vazio.
     */
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

        Employee savedEmployee = employeeRepository.save(employeeEntity);

        EmployeeResponseDTO employeeCreated = new EmployeeResponseDTO();
        BeanUtils.copyProperties(savedEmployee, employeeCreated);

        return employeeCreated;
    }
    //#endregion


    //#region Método para recuperar todos os funcionários
    /**
     * Recupera todos os funcionários do repositório.
     *
     * @return Uma lista contendo todos os funcionários.
     */
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }
    //#endregion

    //#region Método para recuperar um funcionário por ID
    /**
     * Recupera um funcionário específico do repositório com base no ID fornecido.
     *
     * @param id O ID do funcionário a ser recuperado.
     * @return O objeto Employee correspondente ao ID fornecido, ou null se não encontrado.
     */
    public EmployeeResponseDTO findById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Funcionário com ID " + id + " não encontrado."));
        return convertToEmployeeResponseDTO(employee);
    }

    //#endregion
  
    
    
    //#region Método para atualizar um funcionário
    /**
     * Atualiza os detalhes de um funcionário existente com base no ID fornecido.
     *
     * @param id       O ID do funcionário a ser atualizado.
     * @param employee O objeto Employee contendo os novos detalhes a serem atualizados.
     * @return O objeto Employee atualizado após ser salvo no repositório.
     * @throws IllegalArgumentException se o funcionário não for encontrado com o ID fornecido.
     */
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
    //#endregion
   
    //#region Método para deletar um funcionário
    /**
     * Deleta um funcionário existente com base no ID fornecido.
     *
     * @param id O ID do funcionário a ser deletado.
     * @throws IllegalArgumentException se o funcionário não for encontrado com o ID fornecido.
     */
    public void deleteEmployee(Long id) {
        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Funcionário com ID " + id + " não encontrado."));
        employeeRepository.delete(existingEmployee);
    }
    //#endregion

    private EmployeeResponseDTO convertToEmployeeResponseDTO(Employee employee) {
        EmployeeResponseDTO dto = new EmployeeResponseDTO();
        dto.setId(employee.getId());
        dto.setCpf(employee.getCpf());
        dto.setEmail(employee.getEmail());
        dto.setName(employee.getName());
        dto.setPhoneNumber(employee.getPhoneNumber());
        return dto;
    }

    public EmployeeResponseDTO findByEmail(String email) {
        Employee employee = employeeRepository.findByEmail(email);

        if (employee == null) {
            throw new EntityNotFoundException("Funcionário com email " + email + " não encontrado.");
        }

        return convertToEmployeeResponseDTO(employee);
    }

    public void deleteById(Long id) {
        employeeRepository.deleteById(id);
    }

    public boolean emailExists(String email) {
        return employeeRepository.existsByEmail(email);
    }

    public boolean cpfExists(String cpf) {
        return employeeRepository.existsByCpf(cpf);
    }

}
