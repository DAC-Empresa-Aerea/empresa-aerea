interface Flight {
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

export default Flight;