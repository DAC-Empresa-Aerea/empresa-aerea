package com.ms.saga.orchestrator;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ms.saga.dto.customer.refundMiles.RefundMilesRequestDTO;
import com.ms.saga.dto.error.SagaResponse;
import com.ms.saga.dto.flight.FlightResponseDTO;
import com.ms.saga.dto.flight.FlightStatusDTO;
import com.ms.saga.dto.flight.FlightStatusRequestDTO;
import com.ms.saga.dto.reserve.UpdatedReserveStatusDTO;
import com.ms.saga.exception.BusinessException;
import com.ms.saga.producer.CustomerProducer;
import com.ms.saga.producer.FlightProducer;
import com.ms.saga.producer.ReserveProducer;

@Component
public class FlightOrchestrator {

    @Autowired
    private FlightProducer flightProducer;

    @Autowired 
    private ReserveProducer reserveProducer;

    @Autowired
    private CustomerProducer customerProducer;
    
    public FlightResponseDTO processPatchStatusFlight(String id, FlightStatusRequestDTO dto) {

        SagaResponse<FlightResponseDTO> flightResponse = flightProducer.sendUpdateFlightStatus(new FlightStatusDTO(id, dto.getStatus()));

        if (!flightResponse.isSuccess()) {
            throw new BusinessException(flightResponse.getError());
        }

        FlightStatusDTO reserveStatus = new FlightStatusDTO(id, "");
        switch (dto.getStatus()) {
            case "CANCELADO":
                reserveStatus.setStatusCode("CANCELADA VOO");
                break;
            case "REALIZADO":
                reserveStatus.setStatusCode("REALIZADA");
                break;
            default:
                break;
        }

        SagaResponse<List<UpdatedReserveStatusDTO>> reserveResponse =
            reserveProducer.updateStatusReserve(reserveStatus);
        
        if(!reserveResponse.isSuccess()) {
            flightProducer.sendRollbackFlightStatus(new FlightStatusDTO(id, dto.getStatus()));
            throw new BusinessException(reserveResponse.getError());
        }

        if(dto.getStatus().equals("CANCELADO")) {
            List<RefundMilesRequestDTO> refundMilesRequest = new ArrayList<>();

            for(UpdatedReserveStatusDTO rq : reserveResponse.getData()) {
                refundMilesRequest.add(new RefundMilesRequestDTO(
                    rq.getReserveCode()
                ));
            }

            if(!refundMilesRequest.isEmpty()) {
                SagaResponse<List<RefundMilesRequestDTO>> refundResponse = customerProducer.sendRefundMiles(refundMilesRequest);

                if(!refundResponse.isSuccess()) {
                    flightProducer.sendRollbackFlightStatus(new FlightStatusDTO(id, dto.getStatus()));
                    reserveProducer.sendRollbackReserveStatus(reserveStatus);
                    throw new BusinessException(refundResponse.getError());
                }
            }
        }

        return flightResponse.getData();
    }
}
