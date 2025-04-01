// ESTE ARQUIVO SERÁ EXCLUÍDO EM BREVE

export interface CloseOptions {
  text?: string;
  onClose: () => void;
  isOpen: boolean;
}

interface _BasicModalProps {
  children: React.ReactNode;
  className?: string;
  open: CloseOptions;
}

function BasicModal({ children, className, open }: _BasicModalProps) {
  if (!open.isOpen) return null;

  return (
    <div className="w-full h-dvh bg-black/75  z-10 top-0 left-0 flex items-center justify-center fixed">
      <div
        className={`bg-white p-8 m-4 rounded-lg shadow-md md:min-w-1/3 max-w-full min-h-1/2 max-h-full flex items-center justify-between flex-col gap-4 ${className}`}
      >
        {children}
        <button
          onClick={open.onClose}
          className="bg-red-500 w-full p-4 rounded-lg text-gray-100 cursor-pointer shadow-md shadow-black/50"
        >
          {open.text ?? "Fechar"}
        </button>
      </div>
    </div>
  );
}

export default BasicModal;
