import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FlightDetails from "../../components/molecules/cartMolecules/FlightDetails";
import TicketQuantitySelector from "../../components/molecules/cartMolecules/TicketQuantitySelector";
import PurchaseSummary from "../../components/molecules/cartMolecules/PurchaseSummary";
import BookingConfirmation from "../../components/molecules/cartMolecules/BookingConfirmation";
import { useAuth } from "../../contexts/loginContext";
import Customer from "../../types/Customer";
import { useCreateReserve } from "../../hooks/reserves/useCreateReserve";
import { CreateReserveRequest } from "../../types/api/reserve";

const Cart: React.FC = () => {
  const { mutateAsync: createReserveAsync } = useCreateReserve();

  const generateBookingCode = (): string => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";

    for (let i = 0; i < 3; i++) {
      code += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    for (let i = 0; i < 3; i++) {
      code += Math.floor(Math.random() * 10);
    }

    return code;
  };
  const location = useLocation();
  const selectedFlight = location.state?.flight;

  const { user } = useAuth();
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [milesToUse, setMilesToUse] = useState(0);

  const [totalPrice, setValor_passagem] = useState(
    selectedFlight.valor_passagem
  );
  const [requiredMiles, setRequiredMiles] = useState(0);
  const [finalPrice, setFinalPrice] = useState(selectedFlight.valor_passagem);
  const [milesDiscount, setMilesDiscount] = useState(0);

  const milesConversionRate = 5.0;
  const [bookingCode, setBookingCode] = useState<string | null>(null);
  useEffect(() => {
    const newTotalPrice = selectedFlight.valor_passagem * ticketQuantity;
    setValor_passagem(newTotalPrice);

    const newRequiredMiles = Math.round(newTotalPrice / milesConversionRate);
    setRequiredMiles(newRequiredMiles);

    const newMilesDiscount = Math.min(
      milesToUse * milesConversionRate,
      newTotalPrice
    );
    setMilesDiscount(newMilesDiscount);

    const newFinalPrice = newTotalPrice - newMilesDiscount;
    setFinalPrice(newFinalPrice);
  }, [ticketQuantity, milesToUse, selectedFlight.valor_passagem, user]);

  const handleTicketQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= (selectedFlight.quantidade_poltronas_total - selectedFlight.quantidade_poltronas_ocupadas)) {
      setTicketQuantity(value);
    }
  };

  const handleMilesToUseChange = (value: number) => {
    if (!user) return;
    if ("saldo_milhas" in user && value >= 0 && value <= user.saldo_milhas) {
      setMilesToUse(value);
    }
  };
  const handleConfirmPurchase = async () => {
    const newBookingCode = generateBookingCode();
    if (!user) return;

    try {
      const reserveRequest: CreateReserveRequest = {
        codigo_cliente: user.codigo,
        valor: finalPrice,
        milhas_utilizadas: milesToUse,
        quantidade_poltronas: ticketQuantity,
        codigo_voo: selectedFlight.codigo,
        codigo_aeroporto_origem: selectedFlight.aeroporto_origem.codigo,
        codigo_aeroporto_destino: selectedFlight.aeroporto_destino.codigo,
      };

      await createReserveAsync(reserveRequest);
      setBookingCode(newBookingCode);
    } catch (error) {
      console.error("Erro ao criar reserva:", error);
      alert("Erro ao finalizar a reserva. Tente novamente.");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="flex items-center space-x-2 text-sm text-slate-500 mb-6 mt-2">
          <span>Home</span>
          <span>›</span>
          <span>Voos</span>
          <span>›</span>
          <span className="font-medium text-slate-800">Checkout</span>
        </div>

        <h1 className="text-3xl font-bold mb-10 text-slate-900">
          Finalizar sua reserva
        </h1>

        {/* Resumo */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
          {bookingCode ? (
            <BookingConfirmation bookingCode={bookingCode} />
          ) : (
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-2/3 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-slate-100">
                <div className="mb-3">
                  <h2 className="font-semibold text-slate-400 uppercase tracking-wider text-xs">
                    Resumo da reserva
                  </h2>
                </div>
                <FlightDetails flight={selectedFlight} />
                <TicketQuantitySelector
                  quantity={ticketQuantity}
                  onChange={handleTicketQuantityChange}
                  maxQuantity={selectedFlight.quantidade_poltronas_total - selectedFlight.quantidade_poltronas_ocupadas}
                />
              </div>

              <div className="lg:w-1/3 p-6 lg:p-8 bg-slate-50 lg:bg-white">
                <div className="mb-3">
                  <h2 className="font-semibold text-slate-400 uppercase tracking-wider text-xs">
                    Pagamento
                  </h2>
                </div>
                <PurchaseSummary
                  totalPrice={totalPrice}
                  requiredMiles={requiredMiles}
                  milesToUse={milesToUse}
                  milesDiscount={milesDiscount}
                  finalPrice={finalPrice}
                  user={user as Customer}
                  onConfirmPurchase={handleConfirmPurchase}
                  onMilesChange={handleMilesToUseChange}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
