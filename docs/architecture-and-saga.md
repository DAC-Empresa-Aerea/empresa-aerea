# FlyHigh — Arquitetura e saga de reserva

## Do navegador aos microsserviços

O frontend React concentra as telas de clientes e funcionários. As requisições passam pelo API Gateway em Node.js. No backend, os serviços Spring Boot dividem as responsabilidades de autenticação, clientes, funcionários, voos, reservas e orquestração. O Docker Compose reúne os serviços, RabbitMQ, PostgreSQL e MongoDB para execução local.

![Arquitetura do FlyHigh com gateway, serviços, mensageria e bancos](./architecture.svg)

## Reserva com milhas

O orquestrador coordena quatro operações por mensagens no RabbitMQ. Cada serviço confirma sua etapa antes de o orquestrador solicitar a próxima.

1. **Cliente** consulta o saldo de milhas. Se o saldo for insuficiente, o fluxo termina antes da alocação de assentos.
2. **Voos** reserva os assentos solicitados.
3. **Reserva** registra a reserva. Se falhar, o orquestrador solicita a devolução dos assentos.
4. **Cliente** debita as milhas. Se o débito falhar, o orquestrador solicita a devolução dos assentos e desfaz o registro da reserva.

![Etapas da saga de reserva do FlyHigh e ações de compensação](./saga.svg)

As compensações são comandos enviados aos serviços que já alteraram seu estado. O código de criação e de cancelamento está em [ReserveOrchestrator.java](https://github.com/DAC-Empresa-Aerea/empresa-aerea/blob/main/backend/saga/src/main/java/com/ms/saga/orchestrator/ReserveOrchestrator.java).
