import { useState } from "react";
import ReservationTable from "../components/organisms/ReservationTable";
import { Reserve } from "../components/atoms/TableItem";

const CustomerHomePage = () => {
  // Simulação de dados que viriam da API
  const [reserves] = useState<Reserve[]>([
    {
      number: 201,
      departure_city: "São Paulo",
      departure_date: new Date("2025-04-10T08:00:00"),
      arrival_city: "Rio de Janeiro",
      arrival_date: new Date("2025-04-10T10:00:00"),
      status: "Cancelado",
    },
    {
      number: 202,
      departure_city: "Brasília",
      departure_date: new Date("2025-05-15T12:00:00"),
      arrival_city: "Salvador",
      arrival_date: new Date("2025-05-15T14:00:00"),
      status: "Concluído",
    },
    {
      number: 203,
      departure_city: "Curitiba",
      departure_date: new Date("2025-06-20T16:00:00"),
      arrival_city: "Porto Alegre",
      arrival_date: new Date("2025-06-20T18:00:00"),
      status: "Reservado",
    },
  ]);

  return (
      <ReservationTable reserves={reserves} />
  );
};

export default CustomerHomePage;
