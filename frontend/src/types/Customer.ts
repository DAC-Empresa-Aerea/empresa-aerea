interface Customer {
    "codigo": number,
    "cpf": string,
    "email": string,
    "nome": string,
    "saldo_milhas": number,
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

export default Customer;