import CheckInItem from "../atoms/CheckInItem";
import { ReserveWithFlight } from "../../types/api/reserve";

interface CheckInListProps {
  title: string;
  reserves: ReserveWithFlight[];
  onCheckInClick: (reserve: ReserveWithFlight) => void;
}

function CheckInList({ title, reserves, onCheckInClick }: CheckInListProps) {
  return (
    <section className="bg-white m-7 p-4 flex flex-col gap-4 rounded-xl shadow-md h-[80vh] overflow-hidden">
      <h2 className="font-roboto text-xl font-semibold text-gray-800">
        {title}
      </h2>
      <ul className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {reserves.map((reserve) => (
          <CheckInItem
            key={reserve.codigo}
            reserve={reserve}
            onCheckInConfirm={() => onCheckInClick(reserve)}
          />
        ))}
      </ul>
    </section>
  );
}

export default CheckInList;
