package com.ms.reserve.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ms.reserve.command.repository.ReserveCommandRepository;
import com.ms.reserve.dto.reserve.ReserveResponseDTO;
import com.ms.reserve.query.model.ReserveQuery;
import com.ms.reserve.query.repository.ReserveQueryRepository;

@Service
public class ReserveService {

    @Autowired
    private ReserveQueryRepository reserveQueryRepository;

    @Autowired
    private ReserveCommandRepository reserveCommandRepository;
    
    public ReserveResponseDTO getReserveById(String id) {
        ReserveQuery reserve = reserveQueryRepository.findById(id).orElseThrow(() -> new RuntimeException("Reserva não encontrada"));
        
        ReserveResponseDTO reserveResponseDTO = new ReserveResponseDTO();
        BeanUtils.copyProperties(reserve, reserveResponseDTO);
        
        return reserveResponseDTO;
    }
}
