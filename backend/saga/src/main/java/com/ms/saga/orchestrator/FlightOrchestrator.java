package com.ms.saga.orchestrator;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import com.ms.saga.dto.customer.refundMiles.RefundMilesRequestDTO;
import com.ms.saga.dto.error.SagaResponse;
import com.ms.saga.dto.flight.FlightResponseDTO;
import com.ms.saga.dto.flight.FlightStatusDTO;
import com.ms.saga.dto.flight.FlightStatusRequestDTO;
import com.ms.saga.dto.reserve.register.RegisterReserveResponseDTO;
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
        if(dto.getEstado() == null) {
            throw new BusinessException("400", "O status do voo não pode ser nulo.", HttpStatus.BAD_REQUEST.value());
        }
        else if(!(dto.getEstado().equals("CANCELADO") || dto.getEstado().equals("REALIZADO"))) {
            throw new BusinessException("400", "O status do voo deve ser CANCELADO ou REALIZADO.", HttpStatus.BAD_REQUEST.value());
        }

        // Envia o comando de atualização de status do voo

        FlightStatusDTO status = new FlightStatusDTO(id, dto.getEstado());

        SagaResponse<FlightResponseDTO> flightResp =
            flightProducer.sendUpdateFlightCommand(status);
        if (!flightResp.isSuccess()) {
            throw new BusinessException(flightResp.getError());
        }

        switch (status.getStatusCode()) {
            case "CANCELADO":
                status.setStatusCode("CANCELADA_VOO");
                break;
            case "REALIZADO":
                status.setStatusCode("REALIZADA");
                break;
            default:
                break;
        }

        // Envia o status atualizado para o serviço de reserva

        SagaResponse<List<RegisterReserveResponseDTO>> reserveResp =
            reserveProducer.updateStatusReserve(status);
        
        if(reserveResp != null && !reserveResp.isSuccess()) {
            flightProducer.rollbackFlightStatus(status);
            throw new BusinessException(reserveResp.getError());
        }

        // Envia o comando de atualização de milhas do cliente
        for(RegisterReserveResponseDTO rq : reserveResp.getData()) {
            
            RefundMilesRequestDTO refundMilesRequest = new RefundMilesRequestDTO();
            refundMilesRequest.setCustomerCode(rq.getCustomerCode());

            int value = rq.getValue()
              .divide(BigDecimal.valueOf(5))
              .setScale(0, RoundingMode.DOWN)
              .intValue();
 
            refundMilesRequest.setAmount(value);
            refundMilesRequest.setResonRefund("Cancelamento de voo da reserva: " + rq.getReserveCode());
            refundMilesRequest.setReserverCode(rq.getReserveCode());

            customerProducer.sendRefoudSeat(refundMilesRequest);
        }

        return flightResp.getData();
    }
}
