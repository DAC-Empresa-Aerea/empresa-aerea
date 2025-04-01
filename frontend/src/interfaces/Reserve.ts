interface Reserve {
    "codigo": string,
    "data": Date,
    "valor": Number,
    "milhas_utilizadas": Number,
    "quantidade_poltronas": Number,
    "codigo_cliente": Number,
    "estado": string,
    "voo": {
        "codigo": string,
        "data": Date,
        "valor_passagem": Number,
        "quantidade_poltronas_total": Number,
        "quantidade_poltronas_ocupadas": Number,
        "estado": string,
        "aeroporto_origem": {
            "codigo": string,
            "nome": string,
            "cidade": string,
            "uf": string
        },
        "aeroporto_destino": {
            "codigo": string,
            "nome": string,
            "cidade": string,
            "uf": string
        }
    }
}

export default Reserve;