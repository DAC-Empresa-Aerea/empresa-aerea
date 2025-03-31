import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/lara-light-cyan/theme.css";

interface DropdownInputProps {
  value: string;
  setSelectedValue: (value: string) => void;
  options: string[];
  className?: string;
  placeholder?: string;
  required?: boolean;
}

function DropdownInput({
  value,
  setSelectedValue,
  options,
  className,
  placeholder,
  required,
}: DropdownInputProps) {
  return (
    <Dropdown
      value={value}
      onChange={(e) => setSelectedValue(e.value)}
      options={options}
      optionLabel="name"
      placeholder={placeholder ?? "Selecionar"}
      className={`w-full ${className}`}
      required={required}
    />
  );
}

export default DropdownInput;
