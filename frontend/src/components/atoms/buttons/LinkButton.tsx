interface SimpleButtonProps {
  children: React.ReactNode;
  href: string;
  isActive?: boolean;
  className?: string;
}

function LinkButton({
  children,
  href,
  isActive,
  className,
}: SimpleButtonProps) {
  return (
    <a
      className={`transition-colors cursor-pointer font-roboto ${
        isActive
          ? "text-black hover:text-blue-dark font-bold"
          : "text-gray-medium hover:text-blue-medium"
      } ${className || ""}`}
      href={href}
    >
      {children}
    </a>
  );
}

export default LinkButton;
