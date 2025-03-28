import { ReactNode } from "react";

interface SeeReservationProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

function SeeReservation({
    isOpen,
    onClose,
    title,
    children
}: SeeReservationProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-30 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative border border-gray-300">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <div>{children}</div>
                <button
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md w-full"
                    onClick={onClose}
                >
                    Fechar
                </button>
            </div>
        </div>
    );
}

export default SeeReservation;
