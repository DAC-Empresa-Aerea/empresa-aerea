export enum MilesTransactionType {
    ENTRADA = "ENTRADA",
    SAIDA = "SAIDA",
}

export interface MilesTransaction {
    codigo_cliente: string;
    data: string;
    valor_reais: number;
    quantidade_milhas: number;
    descricao: string;
    codigo_reserva: string;
    tipo: MilesTransactionType;
}