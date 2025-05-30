package com.ms.saga.dto.reserve.cancel;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ms.saga.dto.flight.updateSeats.FlightWithAirportResponseDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReserveCancelFlightResponse {
        
    @JsonProperty("codigo")
	private String code;

	@JsonProperty("data")
	private OffsetDateTime date;

	@JsonProperty("valor")
	private BigDecimal value;

	@JsonProperty("milhas_utilizadas")
	private Integer milesUsed;

	@JsonProperty("quantidade_poltronas")
	private Integer seatsQuantity;

	@JsonProperty("codigo_cliente")
	private Long customerCode;

	@JsonProperty("estado")
	private String status;

	@JsonProperty("voo")
	private FlightWithAirportResponseDTO flight;
    
}
