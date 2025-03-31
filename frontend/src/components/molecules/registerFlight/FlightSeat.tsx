import BasicInput from "../../atoms/inputs/BasicInput";

interface FlightSeatsProps {
  totalSeats: number;
  occupiedSeats: number;
  setTotalSeats: (value: number) => void;
  setOccupiedSeats: (value: number) => void;
}

const FlightSeats = ({
  totalSeats,
  occupiedSeats,
  setTotalSeats,
  setOccupiedSeats,
}: FlightSeatsProps) => {
  return (
    <div className="flex gap-4 w-full lg:flex-row flex-col">
      <div className="flex-1">
        <h3 className="text-gray-800 ml-2">Poltronas totais:</h3>
        <BasicInput
          type="number"
          value={totalSeats.toString()}
          placeholder="Poltronas totais"
          onChange={(e) =>
            setTotalSeats(
              Number(e.target.value) > 0 ? Number(e.target.value) : 0
            )
          }
          required
        />
      </div>
      <div className="flex-1">
        <h3 className="text-gray-800 ml-2">Poltronas ocupadas:</h3>
        <BasicInput
          type="number"
          value={occupiedSeats.toString()}
          placeholder="Poltronas livres"
          onChange={(e) =>
            setOccupiedSeats(
              Number(e.target.value) > totalSeats
                ? totalSeats
                : Number(e.target.value) >= 0
                ? Number(e.target.value)
                : 0
            )
          }
          required
        />
      </div>
    </div>
  );
};

export default FlightSeats;
