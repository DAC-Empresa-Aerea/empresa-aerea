package com.ms.customer.service;

//Futuramente vim e adicionar o Exception de NotUnauthorized
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ms.customer.dto.AddressDTO;
import com.ms.customer.dto.CheckMileResponseDTO;
import com.ms.customer.dto.CustomerResponseDTO;
import com.ms.customer.dto.UpdateMilesRequestDTO;
import com.ms.customer.dto.UpdateMilesResponseDTO;
import com.ms.customer.exception.CustomerNotFoundException;
import com.ms.customer.model.Cliente;
import com.ms.customer.repository.ClienteRepository;

@Service
public class CustomerService {

    private final ClienteRepository clienteRepository;

    public CustomerService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public CustomerResponseDTO findById(Long id) {
        Cliente customer = clienteRepository.findById(id).orElseThrow(() -> new CustomerNotFoundException("Cliente não encontrado com o ID: " + id));

        return convertToCustomerResponseDTO(customer);
    }

    public CheckMileResponseDTO getMilesStatement(Long id) {
        Cliente customer = clienteRepository.findById(id).orElseThrow(() -> new CustomerNotFoundException("Cliente não encontrado com ID: " + id));

        CheckMileResponseDTO response = new CheckMileResponseDTO();
        response.setCodigo(customer.getCodigo());
        response.setSaldoMilhas(customer.getSaldoMilhas());
        response.setTransacoes(null);
        return response;
    }

    @Transactional
    public UpdateMilesResponseDTO updateMiles(Long id, UpdateMilesRequestDTO requestDTO) {
        Cliente customer = clienteRepository.findById(id)
                .orElseThrow(() -> new CustomerNotFoundException("Cliente não encontrado para o ID: " + id));

        Integer newBalance = customer.getSaldoMilhas() + requestDTO.getQuantidade();
        customer.setSaldoMilhas(newBalance);

        clienteRepository.save(customer);

        UpdateMilesResponseDTO response = new UpdateMilesResponseDTO();
        response.setCodigo(customer.getCodigo());
        response.setSaldoMilhas(customer.getSaldoMilhas());
        return response;
    }

    private CustomerResponseDTO convertToCustomerResponseDTO(Cliente customer) {
        CustomerResponseDTO dto = new CustomerResponseDTO();
        dto.setCodigo(customer.getCodigo());
        dto.setCpf(customer.getCpf());
        dto.setEmail(customer.getEmail());
        dto.setNome(customer.getNome());
        dto.setSaldoMilhas(customer.getSaldoMilhas());
        
        if (customer.getEndereco() != null) {
            AddressDTO addressDTO = new AddressDTO();
            addressDTO.setCep(customer.getEndereco().getCep());
            addressDTO.setUf(customer.getEndereco().getUf());
            addressDTO.setCidade(customer.getEndereco().getCidade());
            addressDTO.setBairro(customer.getEndereco().getBairro());
            addressDTO.setRua(customer.getEndereco().getRua());
            addressDTO.setNumero(customer.getEndereco().getNumero());
            addressDTO.setComplemento(customer.getEndereco().getComplemento());
            dto.setEndereco(addressDTO);
        }

        return dto;
    }

}

