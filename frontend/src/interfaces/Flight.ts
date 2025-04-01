interface Flight {
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

export default Flight;