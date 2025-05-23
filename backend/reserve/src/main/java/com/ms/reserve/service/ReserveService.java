package com.ms.reserve.service;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ms.reserve.command.model.ReserveCommand;
import com.ms.reserve.command.model.ReserveStatusCommand;
import com.ms.reserve.command.repository.ReserveCommandRepository;
import com.ms.reserve.command.repository.ReserveStatusCommandRepository;
import com.ms.reserve.dto.cqrs.RegisteredReserveDTO;
import com.ms.reserve.dto.cqrs.UpdateStatusDTO;
import com.ms.reserve.dto.reserve.ReserveResponseDTO;
import com.ms.reserve.dto.reserve.register.RegisterReserveRequestDTO;
import com.ms.reserve.dto.reserve.register.RegisterReserveResponseDTO;
import com.ms.reserve.dto.status.FlightStatusDTO;
import com.ms.reserve.dto.status.UpdatedReserveStatusDTO;
import com.ms.reserve.enums.StatusEnum;
import com.ms.reserve.exception.BusinessException;
import com.ms.reserve.producer.CQRSProducer;
import com.ms.reserve.query.model.ReserveQuery;
import com.ms.reserve.query.repository.ReserveQueryRepository;
import com.ms.reserve.utils.GenerateReserveCodeUtil;

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

    public RegisterReserveResponseDTO create(RegisterReserveRequestDTO dto) {
        ReserveCommand reserveCommand = new ReserveCommand();
        BeanUtils.copyProperties(dto, reserveCommand);
        
        ReserveStatusCommand status = statusCommandRepository.findById(StatusEnum.CREATED.getCode())
            .orElseThrow(() -> new RuntimeException("Status não encontrado"));
        
        reserveCommand.setCode(GenerateReserveCodeUtil.generate());
        reserveCommand.setStatus(status);
        reserveCommand.setDate(OffsetDateTime.now());
        
        reserveCommandRepository.save(reserveCommand);
        
        RegisteredReserveDTO registeredReserve = new RegisteredReserveDTO();
        registeredReserve.setReserveCode(reserveCommand.getCode());
        registeredReserve.setCustomerCode(reserveCommand.getCustomerCode());
        registeredReserve.setFlightCode(reserveCommand.getFlightCode());
        registeredReserve.setDate(reserveCommand.getDate());
        registeredReserve.setValue(reserveCommand.getValue());
        registeredReserve.setMilesUsed(reserveCommand.getMilesUsed());
        registeredReserve.setStatus(StatusEnum.CREATED.getCode());
        registeredReserve.setSeatsQuantity(reserveCommand.getSeatsQuantity());

        cqrsProducer.sendReserveCreated(registeredReserve);
    
        RegisterReserveResponseDTO response = new RegisterReserveResponseDTO();
        response.setReserveCode(reserveCommand.getCode());
        response.setCustomerCode(reserveCommand.getCustomerCode());
        response.setDate(reserveCommand.getDate());
        response.setValue(reserveCommand.getValue());
        response.setMilesUsed(reserveCommand.getMilesUsed());
        response.setStatus(StatusEnum.CREATED.getCode());
        response.setSeatsQuantity(reserveCommand.getSeatsQuantity());

        return response;
    }

    public void rollbackRegister(String reserveCode) {
        ReserveCommand reserveCommand = reserveCommandRepository.findById(reserveCode)
            .orElseThrow(() -> new RuntimeException("Reserva não encontrada"));
        
        reserveCommandRepository.delete(reserveCommand);
        
        cqrsProducer.sendRollbackReserve(reserveCode);
    }
    
    public ReserveResponseDTO getReserveById(String id) {
        ReserveQuery reserve = reserveQueryRepository.findById(id).orElseThrow(() -> new BusinessException("RESERVE_NOT_FOUND", "Reserva não encontrada", HttpStatus.NOT_FOUND.value()));
        
        ReserveResponseDTO reserveResponseDTO = new ReserveResponseDTO();
        BeanUtils.copyProperties(reserve, reserveResponseDTO);
        reserveResponseDTO.setStatus(reserve.getStatusCode());
        return reserveResponseDTO;
    }

    public ReserveResponseDTO updateReserveStatusFromUser(String id, String status) {
        List<StatusEnum> validDestinies = List.of(StatusEnum.CHECK_IN, StatusEnum.CANCELED, StatusEnum.BOARDED); 
        StatusEnum newStatus = StatusEnum.fromCode(status);

        if (newStatus == null || !validDestinies.contains(newStatus)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Status inválido");
        }

        ReserveQuery reserveQuery = reserveQueryRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reserva não encontrada"));

        StatusEnum currentStatus = StatusEnum.fromCode(reserveQuery.getStatusCode());

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
        reserveResponseDTO.setStatus(newStatus.getCode());

        return reserveResponseDTO;
    }

    public List<UpdatedReserveStatusDTO> updateStatusReserveWithFlightCode(FlightStatusDTO dto) {
        List<ReserveQuery> reserves = reserveQueryRepository.findByFlightCode(dto.getFlightCode());

        if(reserves.isEmpty()) {
            return new ArrayList<>();
        }

        List<UpdatedReserveStatusDTO> responseList = new ArrayList<>();

        for(ReserveQuery rq : reserves) {
            StatusEnum current = StatusEnum.fromCode(rq.getStatusCode());
            if (StatusEnum.canTransfer(current, StatusEnum.fromCode(dto.getStatusCode()))) {
                ReserveCommand reserveCommand = reserveCommandRepository.findById(rq.getCode())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reserva não encontrada"));
                ReserveStatusCommand status = statusCommandRepository.findById(dto.getStatusCode())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Status não encontrado"));
                reserveCommand.setStatus(status);
                reserveCommandRepository.save(reserveCommand);

                responseList.add(new UpdatedReserveStatusDTO(rq.getCode()));

                cqrsProducer.sendStatusUpdate(rq.getCode(), status.getCode());
            } else if ((current.equals(StatusEnum.CREATED) || current.equals(StatusEnum.CHECK_IN)) && StatusEnum.fromCode(dto.getStatusCode()).equals(StatusEnum.FINISHED)) {
                ReserveCommand reserveCommand = reserveCommandRepository.findById(rq.getCode())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reserva não encontrada"));
                ReserveStatusCommand status = statusCommandRepository.findById(StatusEnum.NOT_FINISHED.getCode())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Status não encontrado"));
                reserveCommand.setStatus(status);
                reserveCommandRepository.save(reserveCommand);

                responseList.add(new UpdatedReserveStatusDTO(rq.getCode()));

                cqrsProducer.sendStatusUpdate(rq.getCode(), status.getCode());
            }
        }

        return responseList;
    }

    public void rollbackStatusReserveWithFlightCode(FlightStatusDTO dto) {
        List<ReserveQuery> reserves = reserveQueryRepository.findByFlightCode(dto.getFlightCode());

        if(reserves.isEmpty()) {
            return;
        }

        for(ReserveQuery rq : reserves) {
            ReserveCommand reserveCommand = reserveCommandRepository.findById(rq.getCode())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reserva não encontrada"));
            ReserveStatusCommand status = statusCommandRepository.findById(StatusEnum.CREATED.getCode())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Status não encontrado"));
            reserveCommand.setStatus(status);
            reserveCommandRepository.save(reserveCommand);

            cqrsProducer.sendRollbackReserveStatus(new UpdateStatusDTO(rq.getCode(), StatusEnum.CREATED.getCode()));
        }
    }

    public List<ReserveResponseDTO> getReservesByCustomerId(Long clienteId) {
        List<ReserveQuery> entities = reserveQueryRepository.findByCustomerCode(clienteId);

        return entities.stream()
            .map(entity -> {
                ReserveResponseDTO dto = new ReserveResponseDTO();
                BeanUtils.copyProperties(entity, dto, "status");
                dto.setStatus(entity.getStatusCode());
                return dto;
            })
            .collect(Collectors.toList());
    }
}
