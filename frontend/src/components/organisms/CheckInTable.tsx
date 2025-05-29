import CheckInList from "../molecules/CheckInList";
import { ReserveWithFlight } from "../../types/api/reserve";

interface CheckInTableProps {
  reserves: Array<ReserveWithFlight>;
  onCheckInClick: (reserve: ReserveWithFlight) => void;
}

function CheckInTable({ reserves, onCheckInClick }: CheckInTableProps) {
  return (
    <CheckInList
      title="Realizar Check-In"
      reserves={reserves}
      onCheckInClick={onCheckInClick}
    />
  );
}

export default CheckInTable;
