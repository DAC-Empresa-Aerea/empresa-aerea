interface Reserve {
    "codigo": string,
    "data": Date,
    "valor": number,
    "milhas_utilizadas": number,
    "quantidade_poltronas": number,
    "codigo_cliente": number,
    "estado": string,
    "voo": {
        "codigo": string,
        "data": Date,
        "valor_passagem": number,
        "quantidade_poltronas_total": number,
        "quantidade_poltronas_ocupadas": number,
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