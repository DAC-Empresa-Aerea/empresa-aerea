import Custumer from "../interfaces/Custumer";

const customersExample: Custumer[] = [
  {
    codigo: 1,
    cpf: '111.111.111-11',
    email: 'alice.silva@example.com',
    nome: 'Alice Silva',
    saldoMilhas: 2500,
    endereco: {
      cep: '01001-000',
      uf: 'SP',
      cidade: 'São Paulo',
      bairro: 'Centro',
      rua: 'Rua do Tesouro',
      numero: '123',
      complemento: 'Apartamento 12'
    }
  },
  {
    codigo: 2,
    cpf: '222.222.222-22',
    email: 'bruno.souza@example.com',
    nome: 'Bruno Souza',
    saldoMilhas: 1000,
    endereco: {
      cep: '20021-120',
      uf: 'RJ',
      cidade: 'Rio de Janeiro',
      bairro: 'Flamengo',
      rua: 'Avenida Oswaldo Cruz',
      numero: '456',
      complemento: 'Casa 3'
    }
  },
  {
    codigo: 3,
    cpf: '333.333.333-33',
    email: 'carla.oliveira@example.com',
    nome: 'Carla Oliveira',
    saldoMilhas: 500,
    endereco: {
      cep: '70070-350',
      uf: 'DF',
      cidade: 'Brasília',
      bairro: 'Asa Sul',
      rua: 'Quadra CLS 104',
      numero: '789',
      complemento: 'Bloco B'
    }
  },
  {
    codigo: 4,
    cpf: '444.444.444-44',
    email: 'danilo.andrade@example.com',
    nome: 'Danilo Andrade',
    saldoMilhas: 3200,
    endereco: {
      cep: '40025-010',
      uf: 'BA',
      cidade: 'Salvador',
      bairro: 'Barra',
      rua: 'Rua Marques de Caravelas',
      numero: '321',
      complemento: ''
    }
  },
  {
    codigo: 5,
    cpf: '555.555.555-55',
    email: 'erica.monteiro@example.com',
    nome: 'Érica Monteiro',
    saldoMilhas: 750,
    endereco: {
      cep: '30180-100',
      uf: 'MG',
      cidade: 'Belo Horizonte',
      bairro: 'Lourdes',
      rua: 'Rua Marília de Dirceu',
      numero: '987',
      complemento: 'Cobertura 1'
    }
  }
];

export default customersExample;
