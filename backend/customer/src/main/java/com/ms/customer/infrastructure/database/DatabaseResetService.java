package com.ms.customer.infrastructure.database;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ms.customer.repository.CustomerRepository;
import com.ms.customer.repository.MilesHistoryRepository;

@Profile("dev")
@Service
public class DatabaseResetService {

    private final MilesHistoryRepository milesHistoryRepository;
    private final CustomerRepository customerRepository;

    public DatabaseResetService(
        MilesHistoryRepository milesHistoryRepository,
        CustomerRepository customerRepository
    ) {
        this.milesHistoryRepository = milesHistoryRepository;
        this.customerRepository = customerRepository;
    }

    @Transactional
    public void resetDatabase() {
        milesHistoryRepository.deleteAll();
        customerRepository.deleteAll();
    }
}


