import { Reserve } from "../../atoms/TableItem";
import ReservationList from "../../molecules/ReservationList";

const reservesDataExample: Array<Reserve> = [
  ];

// Não deixe como opcional, apenas leve a constante acima para o componente pai
interface ReservationTableProps {
  reserves: Array<Reserve>;
}

function ReservationTable({
    reserves = reservesDataExample,
}: ReservationTableProps) {
  return (
    <ReservationList
      title=""  //fix o posicionamento 
      reserves={reserves}
      buttonText="Mais informações"
      onFlightClick={(reserve) =>
        alert(`Não implementado | Selecionar Voo ${reserve.number}`)
      }
      onViewMoreClick={() => alert("Não implementado")}
    />
  );
}

export default ReservationTable;
