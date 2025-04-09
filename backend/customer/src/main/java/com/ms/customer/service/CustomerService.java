package com.ms.customer.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ms.customer.dto.AddressDTO;
import com.ms.customer.dto.CheckMileResponseDTO;
import com.ms.customer.dto.CustomerResponseDTO;
import com.ms.customer.dto.TransitionDTO;
import com.ms.customer.dto.UpdateMilesRequestDTO;
import com.ms.customer.dto.UpdateMilesResponseDTO;
import com.ms.customer.exception.CustomerNotFoundException;
import com.ms.customer.model.Cliente;
import com.ms.customer.model.HistoricoMilhas;
import com.ms.customer.repository.ClienteRepository;
import com.ms.customer.repository.HistoricoMilhasRepository;

@Service
public class CustomerService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private HistoricoMilhasRepository historicoMilhasRepository;

    public CustomerResponseDTO findById(Long id) {
        Cliente customer = clienteRepository.findById(id).orElseThrow(() -> new CustomerNotFoundException("Cliente não encontrado com o ID: " + id));

        return convertToCustomerResponseDTO(customer);
    }

    public CheckMileResponseDTO getMilesStatement(Long id) {
        Cliente customer = clienteRepository.findById(id).orElseThrow(() -> new CustomerNotFoundException("Cliente não encontrado com ID: " + id));

        List<HistoricoMilhas> transactions = historicoMilhasRepository.findByCliente(customer);
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

