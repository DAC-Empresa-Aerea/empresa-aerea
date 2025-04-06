package com.ms.employee.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ms.employee.dto.EmployeeDTO;
import com.ms.employee.model.Employee;
import com.ms.employee.repository.EmployeeRepository;

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
        return employeeRepository.findById(id).orElse(null);
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
    public Employee createEmployee(EmployeeDTO employee) {

        if (employee.getCpf() == null || employee.getCpf().isEmpty()) {
            throw new IllegalArgumentException("CPF não pode ser null ou vazio");
        }
        if (employee.getEmail() == null || employee.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email não pode ser null ou vazio");
        }
        if (employee.getNome() == null || employee.getNome().isEmpty()) {
            throw new IllegalArgumentException("Nome não pode ser null ou vazio");
        }
        if (employee.getTelefone() == null || employee.getTelefone().isEmpty()) {
            throw new IllegalArgumentException("Telefone não pode ser null ou vazio");
        }

        Employee newEmployee = Employee.builder()
                .cpf(employee.getCpf())
                .email(employee.getEmail())
                .nome(employee.getNome())
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
    public Employee updateEmployee(Long id, Employee employee) {
        // TODO - Implementar lógica para atualizar um funcionário existente
        return null;
    }
    //#endregion
   
    //#region Método para deletar um funcionário
    public void deleteEmployee(Long id) {
        // TODO - Implementar lógica para deletar um funcionário existente
    }
    //#endregion
}
