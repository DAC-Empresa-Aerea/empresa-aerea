import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/lara-light-cyan/theme.css";

interface DropdownInputProps {
  value: string;
  setSelectedValue: (value: string) => void;
  options: string[];
  className?: string;
}

export const DropdownInput = ({
  value,
  setSelectedValue,
  options,
  className,
}: DropdownInputProps) => {
  return (
    <Dropdown
      value={value}
      onChange={(e) => setSelectedValue(e.value)}
      options={options}
      optionLabel="name"
      placeholder="Select a Airport"
      className={`w-full ${className}`}
    />
  );
};
