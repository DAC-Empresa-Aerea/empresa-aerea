import TableItem, {Reserve}from "../atoms/TableItem";

interface ReservationListProps {
  title: string;
  reserves: Reserve[];
  buttonText: string;
  onFlightClick: (reserve: Reserve) => void;
  cancelFlightClick?: (reserve: Reserve) => void;
}

function ReservationList({
  title,
  reserves,
  buttonText,
  onFlightClick,
  cancelFlightClick,
}: ReservationListProps) {
  return (
    <section className="bg-white m-7 p-4 min-w-3/4 max-w-full h-full flex gap-4 flex-col">
      <h2 className="font-roboto">{title}</h2>
      <ul className="flex flex-col gap-4">
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
