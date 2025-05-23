package com.ms.reserve.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ms.reserve.dto.cqrs.RegisteredReserveDTO;
import com.ms.reserve.dto.cqrs.UpdateStatusDTO;
import com.ms.reserve.enums.StatusEnum;
import com.ms.reserve.query.model.ReserveQuery;
import com.ms.reserve.query.repository.ReserveQueryRepository;

@Service
public class CQRSService {

    @Autowired
    private ReserveQueryRepository reserveQueryRepository;
    
    public void updateStatus(String reserveId, String status) {
        StatusEnum statusEnum = StatusEnum.fromCode(status);

        if (statusEnum == null) {
            throw new IllegalArgumentException("Invalid status code: " + status);
        }

        ReserveQuery reserveQuery = reserveQueryRepository.findById(reserveId)
                .orElseThrow(() -> new IllegalArgumentException("Reserve not found with ID: " + reserveId));

        reserveQuery.setStatusCode(statusEnum.getCode());
        reserveQuery.setStatusDescription(statusEnum.getDescription());
        reserveQuery.setStatusAbbreviation(statusEnum.getAbbreviation());

        reserveQueryRepository.save(reserveQuery);
    }

    public void createReserve(RegisteredReserveDTO reserveRequest) {
        ReserveQuery reserveQuery = new ReserveQuery();

        reserveQuery.setCode(reserveRequest.getReserveCode());
        reserveQuery.setCustomerCode(reserveRequest.getCustomerCode());
        reserveQuery.setFlightCode(reserveRequest.getFlightCode());
        reserveQuery.setDate(reserveRequest.getDate());
        reserveQuery.setValue(reserveRequest.getValue());
        reserveQuery.setMilesUsed(reserveRequest.getMilesUsed());
        reserveQuery.setStatusCode(reserveRequest.getStatus());
        reserveQuery.setStatusDescription(StatusEnum.fromCode(reserveRequest.getStatus()).getDescription());
        reserveQuery.setStatusAbbreviation(StatusEnum.fromCode(reserveRequest.getStatus()).getAbbreviation());
        reserveQuery.setSeatsQuantity(reserveRequest.getSeatsQuantity());                

        reserveQueryRepository.save(reserveQuery);
    }

    public void deleteReserve(String reserveCode) {
        ReserveQuery reserveQuery = reserveQueryRepository.findById(reserveCode)
                .orElseThrow(() -> new IllegalArgumentException("Reserve not found with ID: " + reserveCode));
        reserveQueryRepository.delete(reserveQuery);
    }
    
    public void rollbackReserveStatus(UpdateStatusDTO dto) {
        ReserveQuery reserveQuery = reserveQueryRepository.findById(dto.getReserveCode())
                .orElseThrow(() -> new IllegalArgumentException("Reserve not found with ID: " + dto.getReserveCode()));

        reserveQuery.setStatusCode(dto.getStatus());
        reserveQuery.setStatusDescription(StatusEnum.fromCode(dto.getStatus()).getDescription());
        reserveQuery.setStatusAbbreviation(StatusEnum.fromCode(dto.getStatus()).getAbbreviation());

        reserveQueryRepository.save(reserveQuery);
    }
}
