package com.ms.reserve.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

        reserveQuery.setEstadoCodigo(statusEnum.getCodigo());
        reserveQuery.setEstadoDescricao(statusEnum.getDescricao());
        reserveQuery.setEstadoSigla(statusEnum.getSigla());

        reserveQueryRepository.save(reserveQuery);
    }
}
