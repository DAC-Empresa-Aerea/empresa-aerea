package com.ms.customer.service;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.util.Collections;
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
import com.ms.customer.dto.cancelReserve.ReserveCancelResponseDTO;
import com.ms.customer.dto.customer.CustomerRequestDTO;
import com.ms.customer.dto.customer.CustomerResponseDTO;
import com.ms.customer.dto.debitSeat.DebitSeatRequestDTO;
import com.ms.customer.dto.debitSeat.DebitSeatResponseDTO;
import com.ms.customer.dto.getMiles.GetMilesResponseDTO;
import com.ms.customer.dto.refundMiles.RefundMilesRequestDTO;
import com.ms.customer.dto.updateMiles.UpdateMilesRequestDTO;
import com.ms.customer.dto.updateMiles.UpdateMilesResponseDTO;
import com.ms.customer.exception.BusinessException;
import com.ms.customer.exception.CustomerNotFoundException;
import com.ms.customer.model.Address;
import com.ms.customer.model.Customer;
import com.ms.customer.model.MilesHistory;
import com.ms.customer.repository.CustomerRepository;
import com.ms.customer.repository.MilesHistoryRepository;
import java.time.LocalDateTime;

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
        BeanUtils.copyProperties(customer.getAddress(), address);
        customerEntity.setAddress(address);

        Customer savedCustomer = customerRepository.save(customerEntity);

        CustomerResponseDTO customerCreated = new CustomerResponseDTO();
        BeanUtils.copyProperties(savedCustomer, customerCreated);

        AddressDTO addressDTO = new AddressDTO();
        BeanUtils.copyProperties(savedCustomer.getAddress(), addressDTO);
        customerCreated.setAddress(addressDTO);
        
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
            response.setTransactions(Collections.emptyList());
        }
        else {
            List<TransitionDTO> transactionDTOs = transactions.stream()
                    .map(transaction -> new TransitionDTO(
                            transaction.getDate(),
                            transaction.getAmountInReais(),
                            transaction.getMilesQuantity(),
                            transaction.getDescription(),
                            transaction.getReserveCode(),
                            transaction.getType()))
                    .toList();
            response.setTransactions(transactionDTOs);
        }

        response.setCode(customer.getCode());
        response.setMilesBalance(customer.getMilesBalance());
        
        return response;
    }

    @Transactional
    public UpdateMilesResponseDTO updateMiles(Long id, UpdateMilesRequestDTO requestDTO) {
        if (requestDTO.getQuantity() == null || requestDTO.getQuantity() <= 0) {
            throw new BusinessException("INVALID_MILES_QUANTITY", "Quantidade de milhas inválida.", HttpStatus.BAD_REQUEST.value());
        }

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new CustomerNotFoundException("Cliente não encontrado para o ID: " + id));

        Integer newBalance = customer.getMilesBalance() + requestDTO.getQuantity();
        customer.setMilesBalance(newBalance);

        customerRepository.save(customer);

        MilesHistory milesHistory = new MilesHistory();
        BigDecimal amountInReais =
        BigDecimal.valueOf(requestDTO.getQuantity())
                .multiply(BigDecimal.valueOf(5));

        milesHistory.setAmountInReais(amountInReais);
        milesHistory.setCustomer(customer);
        milesHistory.setDate(OffsetDateTime.now());
        milesHistory.setDescription("COMPRA DE MILHAS");
        milesHistory.setMilesQuantity(requestDTO.getQuantity());
        milesHistory.setReserveCode("");
        milesHistory.setType("ENTRADA");

        milesHistoryRepository.save(milesHistory);

        UpdateMilesResponseDTO response = new UpdateMilesResponseDTO();
        response.setCode(customer.getCode());
        response.setMilesBalance(customer.getMilesBalance());
        return response;
    }

    private CustomerResponseDTO convertToCustomerResponseDTO(Customer customer) {
        CustomerResponseDTO dto = new CustomerResponseDTO();
        dto.setCode(customer.getCode());
        dto.setCpf(customer.getCpf());
        dto.setEmail(customer.getEmail());
        dto.setName(customer.getName());
        dto.setMilesBalance(customer.getMilesBalance());
        
        if (customer.getAddress() != null) {
            AddressDTO address = new AddressDTO();
            address.setCep(customer.getAddress().getCep());
            address.setUf(customer.getAddress().getUf());
            address.setCity(customer.getAddress().getCity());
            address.setDistrict(customer.getAddress().getDistrict());
            address.setStreet(customer.getAddress().getStreet());
            address.setNumber(customer.getAddress().getNumber());
            address.setComplement(customer.getAddress().getComplement());
            dto.setAddress(address);
        }

        return dto;
    }

    @Transactional
    public DebitSeatResponseDTO debitSeat(DebitSeatRequestDTO debitSeat) {
        Optional<Customer> customerOptional = customerRepository.findById(debitSeat.getCustomerCode());

        if (customerOptional.isEmpty()) {
            throw new BusinessException("CUSTOMER_NOT_FOUND", "Cliente não encontrado.", HttpStatus.NOT_FOUND.value());
        }

        Customer customer = customerOptional.get();

        if (customer.getMilesBalance() < debitSeat.getMilesUsed()) {
            throw new BusinessException("INSUFFICIENT_MILES", "Saldo de milhas insuficiente", HttpStatus.BAD_REQUEST.value());
        }

        customer.setMilesBalance(customer.getMilesBalance() - debitSeat.getMilesUsed());

        MilesHistory transaction = new MilesHistory();
        transaction.setCustomer(customer);
        transaction.setDate(OffsetDateTime.now());
        transaction.setAmountInReais(debitSeat.getValue());
        transaction.setReserveCode(debitSeat.getReserveCode());
        transaction.setMilesQuantity(debitSeat.getMilesUsed());
        transaction.setDescription(debitSeat.getOriginAirportCode() + "->" + debitSeat.getDestinyAirportCode() + " - " + debitSeat.getSeatsQuantity() + " poltronas");
        transaction.setType("SAIDA");

        milesHistoryRepository.save(transaction);
        customerRepository.save(customer);

        DebitSeatResponseDTO debitResponse = new DebitSeatResponseDTO(
                customer.getCode(),
                debitSeat.getReserveCode(),
                debitSeat.getMilesUsed(),
                debitSeat.getValue(),
                debitSeat.getSeatsQuantity(),
                debitSeat.getOriginAirportCode(),
                debitSeat.getDestinyAirportCode()
        );

        return debitResponse;
    }

    @Transactional
    public ReserveCancelResponseDTO cancelReserveMilesReturn(ReserveCancelResponseDTO reserve) {
        Customer customer = customerRepository.findById(reserve.getCustomerCode())
                .orElseThrow(() -> new CustomerNotFoundException("Cliente não encontrado para o ID: " + reserve.getCustomerCode()));

        Integer newBalance = customer.getMilesBalance() + reserve.getMilesUsed();
        customer.setMilesBalance(newBalance);

        customerRepository.save(customer);

        MilesHistory milesHistory = new MilesHistory();
        BigDecimal amountInReais =
        BigDecimal.valueOf(reserve.getMilesUsed())
                .multiply(BigDecimal.valueOf(5));

        milesHistory.setAmountInReais(amountInReais);
        milesHistory.setCustomer(customer);
        ZoneId saoPauloZone = ZoneId.of("America/Sao_Paulo");
        milesHistory.setDate(LocalDateTime.now(saoPauloZone).atZone(saoPauloZone).toOffsetDateTime());
        milesHistory.setDescription("CANCELADA: " + reserve.getCode());
        milesHistory.setMilesQuantity(reserve.getMilesUsed());
        milesHistory.setReserveCode(reserve.getCode());
        milesHistory.setType("ENTRADA");

        milesHistoryRepository.save(milesHistory);

        UpdateMilesResponseDTO response = new UpdateMilesResponseDTO();
        response.setCode(customer.getCode());
        response.setMilesBalance(customer.getMilesBalance());

        return reserve;
    }

    public void deleteById(Long id) {
        customerRepository.deleteById(id);
    }

    public List<RefundMilesRequestDTO> refundMiles(List<RefundMilesRequestDTO> refundMiles) {
        if (refundMiles.isEmpty()) {
            throw new BusinessException("REFUND_MILES_EMPTY", "Lista de reembolso de milhas vazia.", HttpStatus.BAD_REQUEST.value());
        }

        for (RefundMilesRequestDTO rmq : refundMiles) {
            if(rmq.getReserverCode() == null || rmq.getReserverCode().isEmpty()) {
                continue;
            }

            MilesHistory transaction = milesHistoryRepository.findByReserveCode(rmq.getReserverCode());

            if(!(transaction == null)) {
                Customer customer = transaction.getCustomer();
                customer.setMilesBalance(customer.getMilesBalance() + transaction.getMilesQuantity());
                customerRepository.save(customer);

                MilesHistory transactionToRefund = new MilesHistory();
                BeanUtils.copyProperties(transaction, transactionToRefund);
                transactionToRefund.setDescription("VOO CANCELADO");
                transactionToRefund.setDate(OffsetDateTime.now());
                transactionToRefund.setType("ENTRADA");
                milesHistoryRepository.save(transactionToRefund);
            }
        }

        return refundMiles;
    }

    public GetMilesResponseDTO getMilesById(Long code) {
        Customer customer = customerRepository.findById(code)
                .orElseThrow(() -> new BusinessException("CUSTOMER_NOT_FOUND", "Cliente não encontrado.", HttpStatus.NOT_FOUND.value()));

        return new GetMilesResponseDTO(
            customer.getCode(),
            customer.getMilesBalance()
        );
    }

}

