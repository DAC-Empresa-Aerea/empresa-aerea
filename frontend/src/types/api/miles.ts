export enum MilesTransactionType {
  ENTRADA = "ENTRADA",
  SAIDA = "SAIDA",
}

export interface MilesTransaction {
  data: string;
  valor_reais: number;
  quantidade_milhas: number;
  descricao: string;
  codigo_reserva: string;
  tipo: MilesTransactionType;
}

//------------------------------------------------------------------------

// PUT -> /clientes/{codigoCliente}/milhas
// PERMISSION -> CLIENTE
// SUCCESS -> 200
// ERROR -> 401, 403, 404

export type UpdateMilesRequest = {
  quantidade: number;
};

export type UpdateMilesResponse = {
  codigo: number;
  saldo_milhas: number;
};

//------------------------------------------------------------------------

// GET -> /clientes/{codigoCliente}/milhas
// PERMISSION -> CLIENTE
// SUCCESS -> 200
// ERROR -> 401, 403, 404

// NO REQUEST BODY

export type GetMilesHistoryResponse = {
  codigo: number;
  saldo_milhas: number;
  transacoes: Array<MilesTransaction>;
};

//------------------------------------------------------------------------
