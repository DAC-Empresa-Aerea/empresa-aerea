import Button from "./Button";

interface SubmitButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}
export default function SubmitButton({
  text,
  onClick,
  disabled = false,
}: SubmitButtonProps) {
  return (
    <Button type="submit" onClick={onClick} disabled={disabled}>
      {text}
    </Button>
  );
}
