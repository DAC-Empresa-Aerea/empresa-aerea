package com.ms.reserve.dto.cqrs;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RegisteredReserveDTO {

    @JsonProperty("codigo_reserva")
	private String reserveCode;

    @JsonProperty("codigo_cliente")
	private Long customerCode;

    @JsonProperty("codigo_voo")
    private String flightCode;

	@JsonProperty("data")
	private OffsetDateTime date;

	@JsonProperty("valor")
	private BigDecimal value;

	@JsonProperty("milhas_utilizadas")
	private Integer milesUsed;

	@JsonProperty("estado")
	private String status;

	@JsonProperty("quantidade_poltronas")
	private Integer seatsQuantity;

}
