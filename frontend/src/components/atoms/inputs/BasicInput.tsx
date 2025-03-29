interface BasicInputProps {
  type: string;
  value: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  width?: string;
  classNameAdd?: string;
}

export default function BasicInput({
  type,
  value,
  placeholder,
  onChange,
  required = false,
  disabled = false,
  width = "w-full",
  classNameAdd,
}: BasicInputProps) {
  return (
    <input
      type={type}
      className={`mt-1 ${width} rounded-md border px-3 py-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
        disabled ? "bg-[#F4F4F4]" : ""
      } ${classNameAdd} `}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      disabled={disabled}
    />
  );
}
