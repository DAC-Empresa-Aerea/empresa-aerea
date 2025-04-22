package com.ms.employee.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ms.employee.dto.EmployeeRequestDTO;
import com.ms.employee.model.Employee;
import com.ms.employee.repository.EmployeeRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class EmployeeService {

    //#region Injeção de Dependencia
    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
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
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Funcionário com ID " + id + " não encontrado."));
    }

    //#endregion
  
    //#region Método para criar um funcionário
    /**
     * Cria um novo funcionário e o salva no repositório.
     *
     * @param employee O objeto funcionário contendo os detalhes a serem criados.
     *                 Deve incluir valores não nulos e não vazios para CPF, email, nome e telefone.
     * @return O objeto Employee recém-criado após ser salvo no repositório.
     * @throws IllegalArgumentException se qualquer campo obrigatório (CPF, email, nome ou telefone) for nulo ou vazio.
     */
    public Employee createEmployee(EmployeeRequestDTO employee) {

        if (employee.getCpf() == null || employee.getCpf().isEmpty()) {
            throw new IllegalArgumentException("CPF não pode ser null ou vazio");
        }
        if (employee.getEmail() == null || employee.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email não pode ser null ou vazio");
        }
        if (employee.getName() == null || employee.getName().isEmpty()) {
            throw new IllegalArgumentException("Nome não pode ser null ou vazio");
        }
        if (employee.getTelefone() == null || employee.getTelefone().isEmpty()) {
            throw new IllegalArgumentException("Telefone não pode ser null ou vazio");
        }

        if (employeeRepository.existsByCpf(employee.getCpf())) {
            throw new IllegalArgumentException("Já existe um funcionário cadastrado com o CPF " + employee.getCpf());
        }
        if (employeeRepository.existsByEmail(employee.getEmail())) {
            throw new IllegalArgumentException("Já existe um funcionário cadastrado com o email " + employee.getEmail());
        }
        if (employeeRepository.existsByTelefone(employee.getTelefone())) {
            throw new IllegalArgumentException("Já existe um funcionário cadastrado com o telefone " + employee.getTelefone());
        }
        
        Employee newEmployee = Employee.builder()
                .cpf(employee.getCpf())
                .email(employee.getEmail())
                .nome(employee.getName())
                .telefone(employee.getTelefone())
                .build();

        try {
            return employeeRepository.save(newEmployee);
        } catch (Exception e) {
            throw new RuntimeException("Não foi possivel salvar o funcionario. Cheque a conexão do banco.", e);
        }
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
    public Employee updateEmployee(Long id, EmployeeRequestDTO employee) {
        Employee existingEmployee = getEmployeeById(id);

        existingEmployee.setCpf(employee.getCpf());
        existingEmployee.setEmail(employee.getEmail());
        existingEmployee.setNome(employee.getName());
        existingEmployee.setTelefone(employee.getTelefone());

        return employeeRepository.save(existingEmployee);

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
        Employee existingEmployee = getEmployeeById(id);
        employeeRepository.delete(existingEmployee);
    }
    //#endregion
}
