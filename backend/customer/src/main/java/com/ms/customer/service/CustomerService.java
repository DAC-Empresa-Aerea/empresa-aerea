package com.ms.customer.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ms.customer.dto.AddressDTO;
import com.ms.customer.dto.CheckMileResponseDTO;
import com.ms.customer.dto.TransitionDTO;
import com.ms.customer.dto.customer.CustomerResponseDTO;
import com.ms.customer.dto.updateMiles.UpdateMilesRequestDTO;
import com.ms.customer.dto.updateMiles.UpdateMilesResponseDTO;
import com.ms.customer.exception.CustomerNotFoundException;
import com.ms.customer.model.Address;
import com.ms.customer.model.Customer;
import com.ms.customer.model.MilesHistory;
import com.ms.customer.repository.ClienteRepository;
import com.ms.customer.repository.HistoricoMilhasRepository;

@Service
public class CustomerService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private HistoricoMilhasRepository historicoMilhasRepository;

    @Transactional
    public CustomerResponseDTO save(Customer customer) {
        Customer savedCustomer = clienteRepository.save(customer);

        CustomerResponseDTO customerCreated = new CustomerResponseDTO();
        BeanUtils.copyProperties(savedCustomer, customerCreated);

        Address address = new Address();
        BeanUtils.copyProperties(savedCustomer.getEndereco(), address);
        customerCreated.setEndereco(address);
        
        return customerCreated;
    }

    public CustomerResponseDTO findById(Long id) {
        Customer customer = clienteRepository.findById(id).orElseThrow(() -> new CustomerNotFoundException("Cliente não encontrado com o ID: " + id));

        return convertToCustomerResponseDTO(customer);
    }

    public CheckMileResponseDTO getMilesStatement(Long id) {
        Customer customer = clienteRepository.findById(id).orElseThrow(() -> new CustomerNotFoundException("Cliente não encontrado com ID: " + id));

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
        Customer customer = clienteRepository.findById(id)
                .orElseThrow(() -> new CustomerNotFoundException("Cliente não encontrado para o ID: " + id));

        Integer newBalance = customer.getSaldoMilhas() + requestDTO.getQuantidade();
        customer.setSaldoMilhas(newBalance);

        clienteRepository.save(customer);

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
            Address address = new Address();
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

}

