import Button from "./Button";

interface SubmitButtonProps {
  text: string;
  onClick?: () => void;
}
export default function SubmitButton({ text, onClick }: SubmitButtonProps) {
  return (
    <Button type="submit" onClick={onClick}>
      {text}
    </Button>
  );
}
