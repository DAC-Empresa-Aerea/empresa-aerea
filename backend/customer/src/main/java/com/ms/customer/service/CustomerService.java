package com.ms.customer.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ms.customer.dto.AddressDTO;
import com.ms.customer.dto.CheckMileResponseDTO;
import com.ms.customer.dto.TransitionDTO;
import com.ms.customer.dto.customer.CustomerRequestDTO;
import com.ms.customer.dto.customer.CustomerResponseDTO;
import com.ms.customer.dto.updateMiles.UpdateMilesRequestDTO;
import com.ms.customer.dto.updateMiles.UpdateMilesResponseDTO;
import com.ms.customer.exception.CustomerNotFoundException;
import com.ms.customer.model.Address;
import com.ms.customer.model.Customer;
import com.ms.customer.model.MilesHistory;
import com.ms.customer.repository.CustomerRepository;
import com.ms.customer.repository.HistoricoMilhasRepository;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private HistoricoMilhasRepository historicoMilhasRepository;



    @Transactional
    public CustomerResponseDTO create(CustomerRequestDTO customer) {
        System.out.println("Criando cliente: " + customer.getNome());
        Customer customerEntity = new Customer();
        BeanUtils.copyProperties(customer, customerEntity);

        Address address = new Address();
        BeanUtils.copyProperties(customer.getEndereco(), address);
        customerEntity.setEndereco(address);

        Customer savedCustomer = customerRepository.save(customerEntity);

        CustomerResponseDTO customerCreated = new CustomerResponseDTO();
        BeanUtils.copyProperties(savedCustomer, customerCreated);

        AddressDTO addressDTO = new AddressDTO();
        BeanUtils.copyProperties(savedCustomer.getEndereco(), addressDTO);
        customerCreated.setEndereco(addressDTO);
        
        return customerCreated;
    }

    public CustomerResponseDTO findById(Long id) {
        Customer customer = customerRepository.findById(id).orElseThrow(() -> new CustomerNotFoundException("Cliente não encontrado com o ID: " + id));

        return convertToCustomerResponseDTO(customer);
    }
    
    public CustomerResponseDTO findByEmail(String email) {
        Customer customer = customerRepository.findByEmail(email);
        if (customer == null) {
            return null;
        }
        return convertToCustomerResponseDTO(customer);
    }

    public CheckMileResponseDTO getMilesStatement(Long id) {
        Customer customer = customerRepository.findById(id).orElseThrow(() -> new CustomerNotFoundException("Cliente não encontrado com ID: " + id));

        List<MilesHistory> transactions = historicoMilhasRepository.findByCliente(customer);
        CheckMileResponseDTO response = new CheckMileResponseDTO();

        if(transactions.isEmpty()) {
            response.setTransacoes(null);
        }
        else {
            List<TransitionDTO> transactionDTOs = transactions.stream()
                    .map(transaction -> new TransitionDTO(
                            transaction.getData(),
                            transaction.getValorReais(),
                            transaction.getQuantidadeMilhas(),
                            transaction.getDescricao(),
                            transaction.getCodigoReserva(),
                            transaction.getTipo()))
                    .toList();
            response.setTransacoes(transactionDTOs);
        }

        response.setCodigo(customer.getCodigo());
        response.setSaldoMilhas(customer.getSaldoMilhas());
        
        return response;
    }

    @Transactional
    public UpdateMilesResponseDTO updateMiles(Long id, UpdateMilesRequestDTO requestDTO) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new CustomerNotFoundException("Cliente não encontrado para o ID: " + id));

        Integer newBalance = customer.getSaldoMilhas() + requestDTO.getQuantidade();
        customer.setSaldoMilhas(newBalance);

        customerRepository.save(customer);

        UpdateMilesResponseDTO response = new UpdateMilesResponseDTO();
        response.setCodigo(customer.getCodigo());
        response.setSaldoMilhas(customer.getSaldoMilhas());
        return response;
    }

    private CustomerResponseDTO convertToCustomerResponseDTO(Customer customer) {
        CustomerResponseDTO dto = new CustomerResponseDTO();
        dto.setCodigo(customer.getCodigo());
        dto.setCpf(customer.getCpf());
        dto.setEmail(customer.getEmail());
        dto.setNome(customer.getNome());
        dto.setSaldoMilhas(customer.getSaldoMilhas());
        
        if (customer.getEndereco() != null) {
            AddressDTO address = new AddressDTO();
            address.setCep(customer.getEndereco().getCep());
            address.setUf(customer.getEndereco().getUf());
            address.setCidade(customer.getEndereco().getCidade());
            address.setBairro(customer.getEndereco().getBairro());
            address.setRua(customer.getEndereco().getRua());
            address.setNumero(customer.getEndereco().getNumero());
            address.setComplemento(customer.getEndereco().getComplemento());
            dto.setEndereco(address);
        }

        return dto;
    }

    public void deleteById(Long id) {
        customerRepository.deleteById(id);
    }

    public boolean emailExists(String email) {
        return customerRepository.existsByEmail(email);
    }

    public boolean cpfExists(String cpf) {
        return customerRepository.existsByCpf(cpf);
    }

}

