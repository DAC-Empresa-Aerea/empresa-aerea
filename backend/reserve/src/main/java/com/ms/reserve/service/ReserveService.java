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
import com.ms.reserve.dto.reserve.ReserveResponseDTO;
import com.ms.reserve.dto.reserve.register.RegisterReserveRequestDTO;
import com.ms.reserve.dto.reserve.register.RegisterReserveResponseDTO;
import com.ms.reserve.dto.status.FlightStatusDTO;
import com.ms.reserve.enums.StatusEnum;
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
        System.out.println("ID: " + id);
        ReserveQuery reserve = reserveQueryRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reserva nao encontrada"));
        
        ReserveResponseDTO reserveResponseDTO = new ReserveResponseDTO();
        BeanUtils.copyProperties(reserve, reserveResponseDTO);
        reserveResponseDTO.setStatus(reserve.getStatusCode());
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

        System.out.println("Reserva encontrada: " + reserveQuery.getStatusCode());
        StatusEnum currentStatus = StatusEnum.fromCode(reserveQuery.getStatusCode());
        System.out.println("Status atual: " + currentStatus);

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

    public List<RegisterReserveResponseDTO> updateStatusReserveWithFlightCode(FlightStatusDTO dto) {
        List<ReserveQuery> reserves = reserveQueryRepository.findByFlightCode(dto.getFlightCode());

        if(reserves.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Reserva não encontrada");
        }

        List<RegisterReserveResponseDTO> responseListDTO = new ArrayList<>();

        if(dto.getStatusCode().equals("CANCELADA_VOO")) {
            String flightCanceledCode = StatusEnum.FLIGHT_CANCELED.getCode();
            ReserveStatusCommand statusCanceled = statusCommandRepository.findById(flightCanceledCode)
                .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Status FLIGHT_CANCELED não cadastrado"));

            for (ReserveQuery rq : reserves) {
                StatusEnum current = StatusEnum.fromCode(rq.getStatusCode());

                if (StatusEnum.canTransfer(current, StatusEnum.FLIGHT_CANCELED)) {
                    rq.setStatusCode(statusCanceled.getCode());
                    rq.setStatusAbbreviation(statusCanceled.getAbbreviation());
                    rq.setStatusDescription(statusCanceled.getDescription());

                    reserveQueryRepository.save(rq);
                    ReserveCommand reserveCommand = new ReserveCommand();
                    reserveCommand.setCode(rq.getCode());
                    reserveCommand.setCustomerCode(rq.getCustomerCode());
                    reserveCommand.setMilesUsed(rq.getMilesUsed());
                    reserveCommand.setFlightCode(rq.getFlightCode());
                    reserveCommand.setSeatsQuantity(rq.getSeatsQuantity());
                    reserveCommand.setValue(rq.getValue());
                    reserveCommand.setDate(rq.getDate());
                    reserveCommand.setStatus(statusCanceled);

                    reserveCommandRepository.save(reserveCommand);

                    RegisterReserveResponseDTO response = new RegisterReserveResponseDTO();
                    response.setReserveCode(rq.getCode());
                    response.setCustomerCode(rq.getCustomerCode());
                    response.setDate(rq.getDate());
                    response.setValue(rq.getValue());
                    response.setStatus(statusCanceled.getCode());
                    response.setSeatsQuantity(rq.getSeatsQuantity());
                    response.setMilesUsed(rq.getMilesUsed());

                    responseListDTO.add(response);

                    cqrsProducer.sendStatusUpdate(rq.getCode(), statusCanceled.getCode());
                } else if (current.equals(StatusEnum.FLIGHT_CANCELED)) {
                    continue;
                } else {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                        "Não é possível transferir do status " + current.getCode() + " para " + flightCanceledCode);
                }
            }
        }

        if(dto.getStatusCode().equals("REALIZADA")) {
            String flightFinishedCode = StatusEnum.FINISHED.getCode();
            ReserveStatusCommand statusFinished = statusCommandRepository.findById(flightFinishedCode)
                .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Status FINISHED não cadastrado"));
            
            for(ReserveQuery rq: reserves) {
                StatusEnum current = StatusEnum.fromCode(rq.getStatusCode());

                if (StatusEnum.canTransfer(current, StatusEnum.FINISHED)) {
                    rq.setStatusCode(statusFinished.getCode());
                    rq.setStatusAbbreviation(statusFinished.getAbbreviation());
                    rq.setStatusDescription(statusFinished.getDescription());

                    reserveQueryRepository.save(rq);
                    ReserveCommand reserveCommand = new ReserveCommand();

                    reserveCommand.setCustomerCode(rq.getCustomerCode());
                    reserveCommand.setMilesUsed(rq.getMilesUsed());
                    reserveCommand.setFlightCode(rq.getFlightCode());
                    reserveCommand.setSeatsQuantity(rq.getSeatsQuantity());
                    reserveCommand.setValue(rq.getValue());
                    reserveCommand.setCode(rq.getCode());
                    reserveCommand.setDate(rq.getDate());
                    reserveCommand.setStatus(statusFinished);

                    reserveCommandRepository.save(reserveCommand);

                    RegisterReserveResponseDTO response = new RegisterReserveResponseDTO();
                    BeanUtils.copyProperties(rq, response);
                    response.setStatus(statusFinished.getCode());
                    responseListDTO.add(response);

                    cqrsProducer.sendStatusUpdate(rq.getCode(), rq.getStatusCode());
                } else if (current.equals(StatusEnum.FINISHED)) {
                    continue;
                } else if(StatusEnum.canTransfer(current, StatusEnum.NOT_FINISHED)) {
                    rq.setStatusCode(StatusEnum.NOT_FINISHED.getCode());
                    rq.setStatusAbbreviation(StatusEnum.NOT_FINISHED.getAbbreviation());
                    rq.setStatusDescription(StatusEnum.NOT_FINISHED.getDescription());

                    reserveQueryRepository.save(rq);
                    ReserveCommand reserveCommand = new ReserveCommand();

                    reserveCommand.setCustomerCode(rq.getCustomerCode());
                    reserveCommand.setMilesUsed(rq.getMilesUsed());
                    reserveCommand.setFlightCode(rq.getFlightCode());
                    reserveCommand.setSeatsQuantity(rq.getSeatsQuantity());
                    reserveCommand.setValue(rq.getValue());
                    reserveCommand.setCode(rq.getCode());
                    reserveCommand.setDate(rq.getDate());
                    reserveCommand.setStatus(statusFinished);

                    reserveCommandRepository.save(reserveCommand);

                    RegisterReserveResponseDTO response = new RegisterReserveResponseDTO();
                    BeanUtils.copyProperties(rq, response);
                    response.setStatus(StatusEnum.NOT_FINISHED.getCode());
                    responseListDTO.add(response);

                    cqrsProducer.sendStatusUpdate(rq.getCode(), StatusEnum.NOT_FINISHED.getCode());
                }
                else if (current.equals(StatusEnum.FLIGHT_CANCELED)) {
                    continue;
                }
                else {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                        "Não é possível transferir do status " + current.getCode() + " para " + flightFinishedCode);
                }
            }
        }

        return responseListDTO;
        
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
