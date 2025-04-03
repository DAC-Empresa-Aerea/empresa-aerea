import Flight from "../types/Flight";

const complexFlights: Flight[] = [
  {
    codigo: "VOO001",
    data: new Date("2023-06-10T10:30:00"),
    valor_passagem: 450.0,
    quantidade_poltronas_total: 150,
    quantidade_poltronas_ocupadas: 120,
    estado: "Agendado",
    aeroporto_origem: {
      codigo: "GRU",
      nome: "Aeroporto Internacional de Guarulhos",
      cidade: "Guarulhos",
      uf: "SP",
    },
    aeroporto_destino: {
      codigo: "GIG",
      nome: "Aeroporto Internacional do Galeão",
      cidade: "Rio de Janeiro",
      uf: "RJ",
    },
  },
  {
    codigo: "VOO002",
    data: new Date("2023-07-01T15:00:00"),
    valor_passagem: 350.0,
    quantidade_poltronas_total: 180,
    quantidade_poltronas_ocupadas: 180,
    estado: "Lotado",
    aeroporto_origem: {
      codigo: "BSB",
      nome: "Aeroporto Internacional de Brasília",
      cidade: "Brasília",
      uf: "DF",
    },
    aeroporto_destino: {
      codigo: "SSA",
      nome: "Aeroporto Internacional de Salvador",
      cidade: "Salvador",
      uf: "BA",
    },
  },
  {
    codigo: "VOO003",
    data: new Date("2023-08-15T08:15:00"),
    valor_passagem: 520.0,
    quantidade_poltronas_total: 200,
    quantidade_poltronas_ocupadas: 75,
    estado: "Agendado",
    aeroporto_origem: {
      codigo: "CWB",
      nome: "Aeroporto Internacional Afonso Pena",
      cidade: "Curitiba",
      uf: "PR",
    },
    aeroporto_destino: {
      codigo: "FLN",
      nome: "Aeroporto Internacional Hercílio Luz",
      cidade: "Florianópolis",
      uf: "SC",
    },
  },
  {
    codigo: "VOO004",
    data: new Date("2023-09-20T21:45:00"),
    valor_passagem: 750.0,
    quantidade_poltronas_total: 220,
    quantidade_poltronas_ocupadas: 180,
    estado: "Agendado",
    aeroporto_origem: {
      codigo: "MAO",
      nome: "Aeroporto Internacional Eduardo Gomes",
      cidade: "Manaus",
      uf: "AM",
    },
    aeroporto_destino: {
      codigo: "BEL",
      nome: "Aeroporto Internacional de Belém",
      cidade: "Belém",
      uf: "PA",
    },
  },
  {
    codigo: "VOO005",
    data: new Date("2023-10-05T06:00:00"),
    valor_passagem: 900.0,
    quantidade_poltronas_total: 200,
    quantidade_poltronas_ocupadas: 45,
    estado: "Cancelado",
    aeroporto_origem: {
      codigo: "CNF",
      nome: "Aeroporto Internacional de Confins",
      cidade: "Belo Horizonte",
      uf: "MG",
    },
    aeroporto_destino: {
      codigo: "REC",
      nome: "Aeroporto Internacional do Recife",
      cidade: "Recife",
      uf: "PE",
    },
  },
];

export default complexFlights;
