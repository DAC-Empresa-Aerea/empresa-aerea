import { IMaskInput } from "react-imask";

interface MaskedInputProps {
  type: string;
  mask: string;
  value: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (cep: string) => void;
  required?: boolean;
  disabled?: boolean;
  width?: string;
  classNameAdd?: string;
}

export default function MaskedInput({
  type,
  mask,
  value,
  placeholder,
  onChange,
  onBlur,
  required = false,
  disabled = false,
  width = "w-full",
  classNameAdd,
}: MaskedInputProps) {
  return (
    <IMaskInput
      type={type}
      mask={mask}
      className={`mt-1 ${width} rounded-md border px-3 py-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${classNameAdd}`}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      onBlur={() => {
        if (onBlur) {
          onBlur(value);
        }
      }}
      disabled={disabled}
    />
  );
}
