package com.ms.reserve.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ms.reserve.command.model.ReserveCommand;
import com.ms.reserve.command.model.ReserveStatusCommand;
import com.ms.reserve.command.repository.ReserveCommandRepository;
import com.ms.reserve.command.repository.ReserveStatusCommandRepository;
import com.ms.reserve.dto.reserve.ReserveResponseDTO;
import com.ms.reserve.enums.StatusEnum;
import com.ms.reserve.producer.CQRSProducer;
import com.ms.reserve.query.model.ReserveQuery;
import com.ms.reserve.query.repository.ReserveQueryRepository;

@Service
public class ReserveService {

    @Autowired
    private ReserveQueryRepository reserveQueryRepository;

    @Autowired
    private ReserveCommandRepository reserveCommandRepository;

    @Autowired 
    private ReserveStatusCommandRepository statusCommandRepository;

    @Autowired
    private CQRSProducer cqrsProducer;

    
    public ReserveResponseDTO getReserveById(String id) {
        ReserveQuery reserve = reserveQueryRepository.findById(id).orElseThrow(() -> new RuntimeException("Reserva não encontrada"));
        
        ReserveResponseDTO reserveResponseDTO = new ReserveResponseDTO();
        BeanUtils.copyProperties(reserve, reserveResponseDTO);
        
        return reserveResponseDTO;
    }

    public ReserveResponseDTO updateReserveStatusFromUser(String id, String status) {
        List<StatusEnum> validStatuses = List.of(StatusEnum.CREATED, StatusEnum.CHECK_IN);
        StatusEnum newStatus = StatusEnum.fromCode(status);

        if (newStatus == null || !validStatuses.contains(newStatus)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Status inválido");
        }

        ReserveQuery reserveQuery = reserveQueryRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reserva não encontrada"));

        StatusEnum currentStatus = StatusEnum.fromCode(reserveQuery.getCode());

        if (currentStatus.equals(newStatus)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Reserva já está no status " + newStatus.getCode());
        }

        if (!StatusEnum.canTransfer(currentStatus, newStatus)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                "Não é possível transferir do status " + currentStatus.getCode() + " para " + newStatus.getCode());
        }

        ReserveCommand reserveCommand = new ReserveCommand();
        BeanUtils.copyProperties(reserveQuery, reserveCommand);

        ReserveStatusCommand novoStatus = statusCommandRepository.findById(newStatus.getCode()).orElseThrow(
            () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Status não encontrado no modelo de escrita")
        );

        reserveCommand.setStatus(novoStatus);
        reserveCommandRepository.save(reserveCommand);

        cqrsProducer.sendStatusUpdate(reserveCommand.getCode(), newStatus.getCode());

        ReserveResponseDTO reserveResponseDTO = new ReserveResponseDTO();
        BeanUtils.copyProperties(reserveCommand, reserveResponseDTO);

        return reserveResponseDTO;
    }
    
}
