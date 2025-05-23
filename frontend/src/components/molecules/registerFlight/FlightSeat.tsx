import BasicInput from "../../atoms/inputs/BasicInput";

interface FlightSeatsProps {
  totalSeats: number;
  setTotalSeats: (value: number) => void;
}

const FlightSeats = ({
  totalSeats,
  setTotalSeats,
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
    </div>
  );
};

export default FlightSeats;
