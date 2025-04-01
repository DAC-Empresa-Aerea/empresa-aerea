interface Custumer {
    "codigo": Number,
    "cpf": string,
    "email": string,
    "nome": string,
    "saldoMilhas": Number,
    "endereco": {
        "cep": string,
        "uf": string,
        "cidade": string,
        "bairro": string,
        "rua": string,
        "numero": string,
        "complemento": string
    }
}

export default Custumer;