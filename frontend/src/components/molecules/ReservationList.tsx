import TableItem from "../atoms/TableItem";
import { ReserveWithFlight } from "../../types/api/reserve";

interface ReservationListProps {
  title: string;
  reserves: ReserveWithFlight[];
  buttonText: string;
  onFlightClick: (reserve: ReserveWithFlight) => void;
  cancelFlightClick?: (reserve: ReserveWithFlight) => void;
}

function ReservationList({
  title,
  reserves,
  buttonText,
  onFlightClick,
  cancelFlightClick,
}: ReservationListProps) {
  return (
    <section className="bg-white m-7 p-4 flex flex-col gap-4 rounded-xl shadow-md overflow-hidden">
      <h2 className="font-roboto text-xl font-semibold text-gray-800">
        {title}
      </h2>
      <ul className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {reserves.map((reserve) => (
          <TableItem
            key={reserve.codigo}
            reserve={reserve}
            moreInfoClick={() => onFlightClick(reserve)}
            cancelClick={cancelFlightClick ? () => cancelFlightClick(reserve) : undefined}
            buttonText={buttonText}
          />
        ))}
      </ul>
    </section>
  );
}

export default ReservationList;
