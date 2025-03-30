import { useState } from "react";
import SubmitButton from "../components/atoms/buttons/SubmitButton";
import LogoImage from "../components/atoms/images/LogoImage";
import MaskedInput from "../components/atoms/inputs/MaskedInput";
import BasicModal from "../components/atoms/_BasicModal";

const boardingCodes = ["AAA123", "ABC123"];

function ConfirmBoarding() {
  const [boardingCode, setBoardingCode] = useState<string>("");
  const [lastAdd, setLastAdd] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setBoardingCode(value.toUpperCase());
  };

  const verifyCode = (code: string) => {
    const regex = /^[A-Z]{3}\d{3}$/;
    return regex.test(code) && boardingCodes.includes(code);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (verifyCode(boardingCode)) {
      setLastAdd(boardingCode);
      clearFields();
      console.log("Form submitted with boarding code:", boardingCode);
    } else {
      setModalVisible(true);
    }
  };

  const clearFields = () => {
    setBoardingCode("");
  };

  return (
    <>
      {modalVisible && (
        <BasicModal close={{ onClose: () => setModalVisible(false) }} className="">
          <div className="flex-1 w-full flex items-center justify-center text-lg">Nenhuma reserva correspondente para este voo!</div>
        </BasicModal>
      )}
      <div className="flex min-h-dvh items-center justify-center font-roboto">
        <div className="w-full lg:max-w-[35%] rounded-lg bg-white p-8 shadow-lg">
          <LogoImage size="h-10" />
          <h1 className="text-2xl font-bold text-gray-800 text-center cursor-default">
            FlyHigh
          </h1>
          <h2 className="mb-4 text-center text-2xl text-gray-800 cursor-default">
            Confirmar Embarque
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <MaskedInput
              mask="aaa000"
              placeholder={lastAdd ? lastAdd : "ABC123"}
              required
              type="text"
              onChange={handleChange}
              value={boardingCode}
            />
            {lastAdd && (
              <div className="text-sm text-green-700 pl-2 -top-2 relative">
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
