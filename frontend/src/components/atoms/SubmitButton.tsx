interface SubmitButtonProps {
    text: string;
    onClick?: () => void;
}
export default function SubmitButton({
    text,
    onClick
}: SubmitButtonProps) {
    return (
        <button
            type="submit"
            onClick={onClick} // Função de clique
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 cursor-pointer"
        >
            {text}
        </button>
    );
}