package com.ms.saga.orchestrator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ms.saga.dto.reserve.register.RegisterReserveRequestDTO;
import com.ms.saga.dto.reserve.register.RegisterReserveResponseDTO;
import com.ms.saga.producer.ReserveProducer;

@Component
public class ReserveOrchestrator {

    @Autowired ReserveProducer reserveProducer;

    public RegisterReserveResponseDTO processRegisterReserve(RegisterReserveRequestDTO reserveRequest) {
        // Validar existencia de voo, poltronas e validade da data de voo e então reduzir quantidade de poltronas do voo e retornar codigos de aeroportos
        // Validar saldo da pessoa em cliente e se tem as milhas suficientes e então reduzir o saldo de milhas
            // Se erro, rollback
        // Criar reserva com status CRIADA 
            // Se erro, rollback
        // Retornar valor completo

        // Lembrar de usar o ErrorDTO e SagaResponse
        
        return new RegisterReserveResponseDTO();
    }
    
}
