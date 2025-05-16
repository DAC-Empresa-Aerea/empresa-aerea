package com.ms.reserve.infrastructure.database;

import com.ms.reserve.command.repository.ReserveCommandRepository;
import com.ms.reserve.command.repository.ReserveHistoryCommandRepository;
import com.ms.reserve.command.repository.ReserveStatusCommandRepository;
import com.ms.reserve.query.repository.ReserveHistoryQueryRepository;
import com.ms.reserve.query.repository.ReserveQueryRepository;
import com.ms.reserve.seed.DataSeeder;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DatabaseResetService {

    private final ReserveCommandRepository reserveCommandRepository;
    private final ReserveHistoryCommandRepository reserveHistoryCommandRepository;
    private final ReserveStatusCommandRepository reserveStatusRepository;

    private final ReserveQueryRepository reserveQueryRepository;
    private final ReserveHistoryQueryRepository reserveHistoryQueryRepository;
    
    private final List<DataSeeder> seeders;

    public DatabaseResetService(
        ReserveCommandRepository reserveCommandRepository,
        ReserveHistoryCommandRepository reserveHistoryCommandRepository,
        ReserveStatusCommandRepository reserveStatusRepository,
        ReserveQueryRepository reserveQueryRepository,
        ReserveHistoryQueryRepository reserveHistoryQueryRepository,
        List<DataSeeder> seeders
    ) {
        this.reserveCommandRepository = reserveCommandRepository;
        this.reserveHistoryCommandRepository = reserveHistoryCommandRepository;
        this.reserveStatusRepository = reserveStatusRepository;
        this.reserveQueryRepository = reserveQueryRepository;
        this.reserveHistoryQueryRepository = reserveHistoryQueryRepository;
        this.seeders = seeders;
    }

    public void resetDatabase() {
        resetCommandData();
        resetQueryData();
    }

    @Transactional
    private void resetCommandData() {
        reserveHistoryCommandRepository.deleteAll();
        reserveCommandRepository.deleteAll();
        reserveStatusRepository.deleteAll();
        seeders.forEach(DataSeeder::seed);
    }

    @Transactional
    private void resetQueryData() {
        reserveHistoryQueryRepository.deleteAll();
        reserveQueryRepository.deleteAll();
    }
}
