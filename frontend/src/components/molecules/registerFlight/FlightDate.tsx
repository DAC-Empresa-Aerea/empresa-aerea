import BasicInput from "../../atoms/inputs/BasicInput";

interface FlightDateProps {
  date: string;
  setDate: (newDate: string) => void;
}

const FlightDate = ({ date, setDate }: FlightDateProps) => {
  return (
    <div className="flex gap-4 w-full lg:flex-row flex-col">
      <div className="flex-1">
        <h3 className="text-gray-800 ml-2">Data de saída:</h3>
        <BasicInput
          type="date"
          value={date.split("T")[0]}
          onChange={(e) => setDate(`${e.target.value}T${date.split("T")[1]}`)}
          required
        />
      </div>
      <div className="flex-1">
        <h3 className="text-gray-800 ml-2">Horário de saída:</h3>
        <BasicInput
          type="time"
          value={date.split("T")[1]}
          onChange={(e) => setDate(`${date.split("T")[0]}T${e.target.value}`)}
          required
        />
      </div>
    </div>
  );
};

export default FlightDate;
