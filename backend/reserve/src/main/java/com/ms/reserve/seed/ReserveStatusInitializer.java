package com.ms.reserve.seed;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.ms.reserve.command.model.ReserveStatusCommand;
import com.ms.reserve.command.repository.ReserveStatusCommandRepository;
import com.ms.reserve.query.model.ReserveStatusQuery;
import com.ms.reserve.query.repository.ReserveStatusQueryRepository;

@Component
public class ReserveStatusInitializer implements ApplicationRunner {

    @Autowired
    private ReserveStatusCommandRepository commandRepository;

    @Autowired
    private ReserveStatusQueryRepository queryRepository;

    private static final List<ReserveStatusCommand> STATUS_INICIAIS = List.of(
        new ReserveStatusCommand("CRIADA", "CRI", "Reserva criada"),
        new ReserveStatusCommand("CHECK-IN", "CHK", "Check-in realizado"),
        new ReserveStatusCommand("CANCELADA", "CAN", "Reserva cancelada"),
        new ReserveStatusCommand("CANCELADA VOO", "CAV", "Reserva cancelada pelo voo"),
        new ReserveStatusCommand("EMBARCADA", "EMB", "Passageiro embarcado"),
        new ReserveStatusCommand("REALIZADA", "REA", "Reserva realizada com sucesso"),
        new ReserveStatusCommand("NÃO REALIZADA", "NRE", "Reserva não realizada")
    );

    @Override
    public void run(ApplicationArguments args) {
        if (commandRepository.count() == 0) {
            commandRepository.saveAll(STATUS_INICIAIS);
        }

        if (queryRepository.count() == 0) {
            List<ReserveStatusQuery> statusQuery = STATUS_INICIAIS.stream()
                .map(cmd -> new ReserveStatusQuery(cmd.getCodigo(), cmd.getSigla(), cmd.getDescricao()))
                .toList();

            queryRepository.saveAll(statusQuery);
        }
    }
}
