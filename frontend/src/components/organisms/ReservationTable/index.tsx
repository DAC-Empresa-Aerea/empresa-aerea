import { Reserve } from "../../atoms/TableItem";
import ReservationList from "../../molecules/ReservationList";

interface ReservationTableProps {
  reserves: Array<Reserve>;
  onFlightClick: (reserve: Reserve) => void;
}

function ReservationTable({ reserves, onFlightClick }: ReservationTableProps) {
  return (
    <ReservationList
      title="Minhas Reservas"
      reserves={reserves}
      buttonText="Mais informações"
      onFlightClick={onFlightClick}
    />
  );
}

export default ReservationTable;

