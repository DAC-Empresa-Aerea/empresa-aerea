package com.ms.flight.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ms.flight.model.FlightStatus;
import com.ms.flight.repository.FlightStatusRepository;

@Service
public class FlightStatusService {
    
    @Autowired
    private FlightStatusRepository flightStatusRepository;

    public FlightStatus getFlightStatusByCode(String code) {
        return flightStatusRepository.findById(code)
            .orElseThrow(() -> new IllegalArgumentException("Status não encontrado!"));
    }

}
