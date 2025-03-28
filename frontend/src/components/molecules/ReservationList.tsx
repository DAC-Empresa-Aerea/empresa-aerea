import TableItem, {Reserve}from "../atoms/TableItem";

interface ReservationListProps {
  title: string;
  reserves: Reserve[];
  buttonText: string;
  onFlightClick: (reserve: Reserve) => void;
}

function ReservationList({
  title,
  reserves,
  buttonText,
  onFlightClick,
}: ReservationListProps) {
  return (
    <section className="bg-white m-7 p-4 min-w-3/4 max-w-full h-full flex gap-4 flex-col">
      <h2 className="font-roboto">{title}</h2>
      <ul className="flex flex-col gap-4">
        {reserves.map((reserve) => (
          <TableItem
            key={reserve.number}
            reserve={reserve}
            onClick={() => onFlightClick(reserve)}
            buttonText={buttonText}
          />
        ))}
      </ul>
    </section>
  );
}

export default ReservationList;
