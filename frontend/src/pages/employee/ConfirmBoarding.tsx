import { useState } from "react";
import SubmitButton from "../../components/atoms/buttons/SubmitButton";
import LogoImage from "../../components/atoms/images/LogoImage";
import MaskedInput from "../../components/atoms/inputs/MaskedInput";
import BasicModal from "../../components/atoms/modals/_BasicModal";
import { useUpdateReserveToEmbarked } from "../../hooks/reserves/useUpdateReserveStatus";
import { useReservesByFlightCode } from "../../hooks/reserves/useReservesByFlightCode";
import { Reserve } from "../../types/api/reserve";

function ConfirmBoarding({ flightCode }: { flightCode: string }) {
  const [boardingCode, setBoardingCode] = useState("");
  const [lastAdd, setLastAdd] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch reserves by flight code using React Query
  const { data: flightReserves = [] } = useReservesByFlightCode(flightCode);

  // Get boarding codes from flight reserves
  const boardingCodes = flightReserves.map(
    (reserve: Reserve) => reserve.codigo
  );

  // Hook for updating reserve to embarked status
  const { mutateAsync: updateToEmbarked } = useUpdateReserveToEmbarked();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBoardingCode(event.target.value.toUpperCase());
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (boardingCode) {
      try {
        await updateToEmbarked(boardingCode);
        setLastAdd(boardingCode);
        setBoardingCode("");
        console.log("Reserva atualizada para estado: EMBARCADO");
      } catch (error: any) {
        if(error.response && error.response.status === 404) {
          console.error("Reserva não encontrada ou já embarcada.");
          setModalVisible(true);
        }
      }
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
          Nenhuma voo correspondente para esta reserva!
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
