import Reserve from "../../../types/Reserve";
import ReservationList from "../../molecules/ReservationList";

interface ReservationTableProps {
  reserves: Array<Reserve>;
  onFlightClick: (reserve: Reserve) => void;
  cancelFlightClick?: (reserve: Reserve) => void;
}

function ReservationTable({ reserves, onFlightClick , cancelFlightClick}: ReservationTableProps) {
  return (
    <ReservationList
      title="Minhas Reservas"
      reserves={reserves}
      buttonText="Mais informações"
      onFlightClick={onFlightClick}
      cancelFlightClick={cancelFlightClick}
    />
  );
}

export default ReservationTable;

