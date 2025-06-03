import { ReserveWithFlight } from "../../../types/api/reserve";
import ReservationList from "../../molecules/ReservationList";

interface ReservationTableProps {
  reserves: Array<ReserveWithFlight>;
  onFlightClick: (reserve: ReserveWithFlight) => void;
  cancelFlightClick?: (reserve: ReserveWithFlight) => void;
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

