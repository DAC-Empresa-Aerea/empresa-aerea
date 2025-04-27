package com.ms.customer.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ms.customer.dto.AddressDTO;
import com.ms.customer.dto.CheckMileResponseDTO;
import com.ms.customer.dto.TransitionDTO;
import com.ms.customer.dto.customer.CustomerRequestDTO;
import com.ms.customer.dto.customer.CustomerResponseDTO;
import com.ms.customer.dto.debitSeat.DebitSeatRequestDTO;
import com.ms.customer.dto.debitSeat.DebitSeatResponseDTO;
import com.ms.customer.dto.updateMiles.UpdateMilesRequestDTO;
import com.ms.customer.dto.updateMiles.UpdateMilesResponseDTO;
import com.ms.customer.exception.BusinessException;
import com.ms.customer.exception.CustomerNotFoundException;
import com.ms.customer.model.Address;
import com.ms.customer.model.Customer;
import com.ms.customer.model.MilesHistory;
import com.ms.customer.repository.CustomerRepository;
import com.ms.customer.repository.MilesHistoryRepository;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private MilesHistoryRepository milesHistoryRepository;

    public CustomerResponseDTO create(CustomerRequestDTO customer) {
        if (customerRepository.existsByEmail(customer.getEmail())) {
            throw new BusinessException("EMAIL_EXISTS", "Email já existe.", HttpStatus.CONFLICT.value());
        }

        if (customerRepository.existsByCpf(customer.getCpf())) {
            throw new BusinessException("CPF_EXISTS", "CPF já existe.", HttpStatus.CONFLICT.value());
        }

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

        List<MilesHistory> transactions = milesHistoryRepository.findByCustomer(customer);
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

    public DebitSeatResponseDTO debitSeat(DebitSeatRequestDTO debitSeat) {
        Optional<Customer> customerOptional = customerRepository.findById(debitSeat.getCustomerCode());

        if (customerOptional.isEmpty()) {
            throw new BusinessException("CUSTOMER_NOT_FOUND", "Cliente não encontrado.", HttpStatus.NOT_FOUND.value());
        }

        Customer customer = customerOptional.get();

        if (customer.getSaldoMilhas() < debitSeat.getMilesUsed()) {
            throw new BusinessException("INSUFFICIENT_MILES", "Saldo de milhas insuficiente.", HttpStatus.BAD_REQUEST.value());
        }

        customer.setSaldoMilhas(customer.getSaldoMilhas() - debitSeat.getMilesUsed());

        MilesHistory transaction = new MilesHistory();
        transaction.setData(LocalDateTime.now());
        transaction.setValorReais(debitSeat.getValue());
        transaction.setCodigoReserva(debitSeat.getReserveCode());
        transaction.setQuantidadeMilhas(debitSeat.getMilesUsed());
        transaction.setDescricao(debitSeat.getOriginAirportCode() + "->" + debitSeat.getDestinyAirportCode() + " - " + debitSeat.getSeatsQuantity() + " poltronas");
        transaction.setCodigoReserva(debitSeat.getCustomerCode().toString());
        transaction.setTipo("SAIDA");

        customerRepository.save(customer);
        milesHistoryRepository.save(transaction);

        DebitSeatResponseDTO debitResponse = new DebitSeatResponseDTO(
                customer.getCodigo(),
                debitSeat.getReserveCode(),
                debitSeat.getMilesUsed(),
                debitSeat.getValue(),
                debitSeat.getSeatsQuantity(),
                debitSeat.getOriginAirportCode(),
                debitSeat.getDestinyAirportCode()
        );

        return debitResponse;
    }

    public void deleteById(Long id) {
        customerRepository.deleteById(id);
    }

}

