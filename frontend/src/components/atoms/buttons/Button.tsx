interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  onClick,
  className,
  disabled = false,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 cursor-pointer transition-colors font-roboto whitespace-nowrap ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
}
