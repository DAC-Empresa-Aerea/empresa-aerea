import CheckInList from "../molecules/CheckInList";
import Reserve from "../../types/Reserve";

interface CheckInTableProps {
  reserves: Array<Reserve>;
  onCheckInClick: (reserve: Reserve) => void;
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
