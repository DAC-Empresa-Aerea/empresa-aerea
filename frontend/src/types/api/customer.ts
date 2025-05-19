export interface Customer {
  cpf: string;
  email: string;
  nome: string;
  saldo_milhas: number;
  senha: string;
  endereco: {
    cep: string;
    uf: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    complemento: string;
  };
}

export interface CustomerWithCode extends Customer {
  codigo: number;
}


//------------------------------------------------------------------------

// POST -> /clientes
// PERMISSION -> Nenhuma
// SUCCESS -> 201
// ERRORS -> 409

export type CreateCustomerRequest = Omit<Customer, 'senha'>;

export type CreateCustomerResponse = CustomerWithCode;

//-----------------------------------------------------------------------

// GET -> /clientes/{codigo}
// PERMISSION -> CLIENTE
// SUCCESS -> 200
// ERRORS -> 401, 404

// NO REQUEST BODY

export type GetCustomerResponse = CustomerWithCode;

//-----------------------------------------------------------------------
