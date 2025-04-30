package com.ms.employee.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.beans.BeanUtils;

import com.ms.employee.dto.employee.EmployeeRequestDTO;
import com.ms.employee.dto.employee.EmployeeResponseDTO;
import com.ms.employee.model.Employee;
import com.ms.employee.repository.EmployeeRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;


    //#region Método para criar um funcionário
    /**
     * Cria um novo funcionário e o salva no repositório.
     *
     * @param employee O objeto EmployeeRequestDTO contendo os detalhes do funcionário a ser criado.
     *                 Deve incluir valores não nulos e não vazios para CPF, email, nome e telefone.
     * @return O objeto EmployeeResponseDTO representando o funcionário recém-criado após ser salvo no repositório.
     * @throws IllegalArgumentException se qualquer campo obrigatório (CPF, email, nome ou telefone) for nulo ou vazio.
     */
    @Transactional
    public EmployeeResponseDTO create(EmployeeRequestDTO employee) {
        if (employee.getCpf() == null || employee.getCpf().isEmpty() ||
            employee.getEmail() == null || employee.getEmail().isEmpty() ||
            employee.getName() == null || employee.getName().isEmpty() ||
            employee.getTelefone() == null || employee.getTelefone().isEmpty()) {
            throw new IllegalArgumentException("CPF, email, nome e telefone são obrigatórios e não podem ser nulos ou vazios.");
        }

        System.out.println("Criando funcionário: " + employee.getName());
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
    @Transactional
    public EmployeeResponseDTO updateEmployee(Long id, EmployeeRequestDTO employee) {
        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Funcionário com ID " + id + " não encontrado."));

        existingEmployee.setCpf(employee.getCpf());
        existingEmployee.setEmail(employee.getEmail());
        existingEmployee.setNome(employee.getName());
        existingEmployee.setTelefone(employee.getTelefone());

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
        dto.setNome(employee.getNome());
        dto.setTelefone(employee.getTelefone());
        return dto;
    }

}
