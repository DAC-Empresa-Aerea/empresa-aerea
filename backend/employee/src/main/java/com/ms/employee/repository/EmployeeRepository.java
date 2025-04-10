package com.ms.employee.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ms.employee.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> { 
    boolean existsByCpf(String cpf);
    boolean existsByEmail(String email);
    boolean existsByTelefone(String telefone);
    
}
