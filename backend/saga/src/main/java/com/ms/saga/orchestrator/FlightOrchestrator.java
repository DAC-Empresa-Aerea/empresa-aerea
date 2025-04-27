package com.ms.saga.orchestrator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ms.saga.dto.error.SagaResponse;
import com.ms.saga.dto.flight.FlightResponseDTO;
import com.ms.saga.dto.flight.FlightStatusDTO;
import com.ms.saga.dto.flight.FlightStatusRequestDTO;
import com.ms.saga.exception.BusinessException;
import com.ms.saga.producer.FlightProducer;
import com.ms.saga.producer.ReserveProducer;

@Component
public class FlightOrchestrator {

    @Autowired
    private FlightProducer flightProducer;

    @Autowired 
    private ReserveProducer reserveProducer;
    
    public FlightResponseDTO processPatchStatusFlight(String id, FlightStatusRequestDTO dto) {
        FlightStatusDTO flightStatusDTO = new FlightStatusDTO();
        flightStatusDTO.setFlightCode(id);
        flightStatusDTO.setStatusCode(dto.getEstado());

        SagaResponse<FlightResponseDTO> flightResponse = flightProducer.sendUpdateFlightCommand(flightStatusDTO);

        if(!flightResponse.isSuccess()) {
            throw new BusinessException(flightResponse.getError());
        }

        reserveProducer.updateStatusReserve(flightStatusDTO);
        
        return flightResponse.getData();
    }
}
