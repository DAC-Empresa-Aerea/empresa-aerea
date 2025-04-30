import BasicInput from "../../atoms/inputs/BasicInput";

interface FlightDateProps {
  date: string;
  setDate: (newDate: string) => void;
  time: string;
  setTime: (newTime: string) => void;
}

const FlightDate = ({ date, setDate, time, setTime }: FlightDateProps) => (
  <div className="flex gap-4 w-full lg:flex-row flex-col">
    <div className="flex-1">
      <h3 className="text-gray-800 ml-2">Data de saída:</h3>
      <BasicInput
        type="date"
        value={date}
        onChange={(e) => {
          const inputDate = e.target.value;
          const yearPart = inputDate.split("-")[0];
          
          if (/^\d{4}$/.test(yearPart)) {
            console.log("Ano válido:", inputDate);
            setDate(inputDate);
          }
        }}
      required
      />
    </div>
    <div className="flex-1">
      <h3 className="text-gray-800 ml-2">Horário de saída:</h3>
      <BasicInput
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
    </div>
  </div>
);

export default FlightDate;
