import { useState } from "react";
import SubmitButton from "../components/atoms/buttons/SubmitButton";
import LogoImage from "../components/atoms/images/LogoImage";
import MaskedInput from "../components/atoms/inputs/MaskedInput";
import BasicModal from "../components/atoms/modals/_BasicModal";

const boardingCodes = ["AAA123", "ABC123"];

function ConfirmBoarding() {
  const [boardingCode, setBoardingCode] = useState("");
  const [lastAdd, setLastAdd] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBoardingCode(event.target.value.toUpperCase());
  };

  const verifyCode = (code: string) => {
    return /^[A-Z]{3}\d{3}$/.test(code) && boardingCodes.includes(code);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (verifyCode(boardingCode)) {
      setLastAdd(boardingCode);
      setBoardingCode("");
      console.log("Código confirmado:", boardingCode);
    } else {
      setModalVisible(true);
    }
  };

  return (
    <>
      <BasicModal
        open={{ onClose: () => setModalVisible(false), isOpen: modalVisible }}
      >
        <div className="flex-1 w-full flex items-center justify-center text-lg">
          Nenhuma reserva correspondente para este voo!
        </div>
      </BasicModal>

      <div className="flex min-h-dvh items-center justify-center font-roboto">
        <div className="w-full lg:max-w-[35%] rounded-lg bg-white p-8 shadow-lg">
          <LogoImage size="h-10" />
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            FlyHigh
          </h1>
          <h2 className="mb-4 text-center text-2xl text-gray-800">
            Confirmar Embarque
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <MaskedInput
              mask="aaa000"
              placeholder={lastAdd || "ABC123"}
              required
              type="text"
              onChange={handleChange}
              value={boardingCode}
            />

            {lastAdd && (
              <div className="text-sm text-green-700 pl-2 relative">
                {lastAdd} confirmado com sucesso!
              </div>
            )}

            <SubmitButton text="Confirmar" />
          </form>
        </div>
      </div>
    </>
  );
}

export default ConfirmBoarding;
