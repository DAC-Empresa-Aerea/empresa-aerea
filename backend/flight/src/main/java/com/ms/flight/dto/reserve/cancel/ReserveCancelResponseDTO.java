package com.ms.flight.dto.reserve.cancel;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReserveCancelResponseDTO {
        
	@JsonProperty("codigo")
	private String code;

	@JsonProperty("data")
	private LocalDateTime date;

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

	@JsonProperty("codigo_voo")
	private String flightCode;
}
