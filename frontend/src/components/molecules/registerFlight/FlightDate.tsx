import BasicInput from "../../atoms/inputs/BasicInput";

interface FlightDateProps {
  date: string;
  setDate: (newDate: string) => void;
}

const FlightDate = ({ date, setDate }: FlightDateProps) => {
  // Separa partes da data
  const datePart = date ? date.split("T")[0] : "";
  const timePart = date ? date.split("T")[1] : "";

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setDate(`${newDate}T${timePart || "00:00"}`);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setDate(`${datePart || "2024-01-01"}T${newTime}`);
  };

  return (
    <div className="flex gap-4 w-full lg:flex-row flex-col">
      <div className="flex-1">
        <h3 className="text-gray-800 ml-2">Data de saída:</h3>
        <BasicInput
          type="date"
          value={datePart}
          onChange={handleDateChange}
          required
        />
      </div>
      <div className="flex-1">
        <h3 className="text-gray-800 ml-2">Horário de saída:</h3>
        <BasicInput
          type="time"
          value={timePart}
          onChange={handleTimeChange}
          required
        />
      </div>
    </div>
  );
};

export default FlightDate;
