import BasicInput from "../../atoms/inputs/BasicInput";

interface FlightPriceProps {
  value: number;
  setValue: (val: number) => void;
}

const FlightPrice = ({ value, setValue }: FlightPriceProps) => {
  const moneyMask = (value: number) => {
    if (value === undefined || value === null) return "R$ 0,00";

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    const numberValue = inputValue === "" ? 0 : Number(inputValue) / 100;
    setValue(numberValue);
  };

  const miles = value ? Math.ceil(value / 5) : 0;

  return (
    <div className="flex gap-4 w-full lg:flex-row flex-col">
      <BasicInput
        type="text"
        value={moneyMask(value)}
        placeholder="Preço da passagem (ex: R$ 123,00)"
        onChange={handleInputChange}
        required
        classNameAdd="flex-1"
      />
      <BasicInput
        type="number"
        value={miles ? miles.toString() : ""}
        placeholder="Total de Milhas"
        disabled
        classNameAdd="flex-1"
      />
    </div>
  );
};

export default FlightPrice;
