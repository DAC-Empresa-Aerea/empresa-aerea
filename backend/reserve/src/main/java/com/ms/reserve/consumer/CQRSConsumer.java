package com.ms.reserve.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ms.reserve.config.RabbitMQConfig;
import com.ms.reserve.dto.cqrs.RegisteredReserveDTO;
import com.ms.reserve.dto.cqrs.UpdateStatusDTO;
import com.ms.reserve.service.CQRSService;

@Component
public class CQRSConsumer {
    
    @Autowired
    private CQRSService cqrsService;

    @RabbitListener(queues = RabbitMQConfig.RESERVE_STATUS_UPDATED_QUEUE)
    public void receiveReserveStatusUpdated(UpdateStatusDTO event) {
        cqrsService.updateStatus(event.getReserveCode(), event.getStatus());
    }

    @RabbitListener(queues = RabbitMQConfig.RESERVE_CREATED_QUEUE)
    public void receiveReserveCreated(RegisteredReserveDTO reserveRequest) {
        cqrsService.createReserve(reserveRequest);
    }

    @RabbitListener(queues = RabbitMQConfig.DELETE_RESERVE_EXCHANGE)
    public void receiveReserveDelete(String reserveCode) {
        cqrsService.deleteReserve(reserveCode);
    }

}
