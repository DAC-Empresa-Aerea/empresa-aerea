export interface AirportExample {
  code: string;
  name: string;
  city: string;
  uf: string;
}

export const airportsDataExample: AirportExample[] = [
  {
    code: "GRU",
    name: "Aeroporto Internacional de São Paulo/Guarulhos",
    city: "São Paulo",
    uf: "SP",
  },
  {
    code: "GIG",
    name: "Aeroporto Internacional do Rio de Janeiro/Galeão",
    city: "Rio de Janeiro",
    uf: "RJ",
  },
  {
    code: "CWB",
    name: "Aeroporto Internacional Afonso Pena",
    city: "Curitiba",
    uf: "PR",
  },
  {
    code: "POA",
    name: "Aeroporto Internacional Salgado Filho",
    city: "Porto Alegre",
    uf: "RS",
  },
];
