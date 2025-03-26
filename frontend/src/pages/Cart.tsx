import React, { useState, useEffect } from "react";
import FlightDetails from "../components/molecules/FlightDetails";
import TicketQuantitySelector from "../components/molecules/TicketQuantitySelector";
import PurchaseSummary from "../components/molecules/PurchaseSummary";
import BookingConfirmation from "../components/molecules/BookingConfirmation";
import { SelectedFlight, User } from "../types/flightTypes";

// Dados simulados de usuário
const mockUser: User = {
  id: "user123",
  name: "João Silva",
  milesBalance: 15000 // saldo de milhas
};

// Voo selecionado mock (isso viria da tela de resultados de pesquisa)
const mockSelectedFlight: SelectedFlight = {
  id: "flight789",
  origin: "São Paulo (GRU)",
  destination: "Rio de Janeiro (SDU)",
  departureDate: "2025-04-10",
  departureTime: "08:30",
  arrivalDate: "2025-04-10",
  arrivalTime: "09:30",
  seatPrice: 450.00,
  airline: "Airline Brasil",
  flightNumber: "AB1234"
};

// Função para gerar código de reserva único (3 letras maiúsculas + 3 números)
const generateBookingCode = (): string => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';
  
  // Gerar 3 letras aleatórias
  for (let i = 0; i < 3; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  
  // Gerar 3 números aleatórios
  for (let i = 0; i < 3; i++) {
    code += Math.floor(Math.random() * 10);
  }
  
  return code;
};

const Cart: React.FC = () => {
  const selectedFlight = mockSelectedFlight;
  
  const [user, setUser] = useState<User>(mockUser);
  
  // Quantidade de passagens e uso de milhas
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [milesToUse, setMilesToUse] = useState(0);
  const [bookingCode, setBookingCode] = useState<string | null>(null);
  
  // Cálculos
  const [totalPrice, setTotalPrice] = useState(selectedFlight.seatPrice);
  const [requiredMiles, setRequiredMiles] = useState(0);
  const [finalPrice, setFinalPrice] = useState(selectedFlight.seatPrice);
  const [milesDiscount, setMilesDiscount] = useState(0);
  
  //  100 milhas = R$ 10
  const milesConversionRate = 0.1;
  
  useEffect(() => {
    const newTotalPrice = selectedFlight.seatPrice * ticketQuantity;
    setTotalPrice(newTotalPrice); 

    // Milhas necessárias para o preço total
    const newRequiredMiles = Math.round(newTotalPrice / milesConversionRate);
    setRequiredMiles(newRequiredMiles);
    
    // Desconto baseado nas milhas utilizadas
    const newMilesDiscount = Math.min(milesToUse * milesConversionRate, newTotalPrice);
    setMilesDiscount(newMilesDiscount);
    
    // Preço final após desconto de milhas
    const newFinalPrice = newTotalPrice - newMilesDiscount;
    setFinalPrice(newFinalPrice);
    
  }, [ticketQuantity, milesToUse, selectedFlight.seatPrice]);
  
  const handleTicketQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 10) {
      setTicketQuantity(value);
    }
  };
  
  const handleMilesToUseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value <= user.milesBalance) {
      setMilesToUse(value);
    }
  };
  
  // Confirmar compra
  const handleConfirmPurchase = () => {
    //Atualizar saldo
    const updatedUser = {
      ...user,
      milesBalance: user.milesBalance - milesToUse
    };
    
    setUser(updatedUser);
    
    // Gerar código de reserva
    const newBookingCode = generateBookingCode();
    setBookingCode(newBookingCode);
    
    console.log("Compra confirmada!", {
      flight: selectedFlight,
      quantity: ticketQuantity,
      milesUsed: milesToUse,
      finalPrice: finalPrice,
      bookingCode: newBookingCode
    });
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
        
        <h1 className="text-3xl font-bold mb-10 text-slate-900">Finalizar sua reserva</h1>
        
      {/* Resumo */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
          {bookingCode ? (
            <BookingConfirmation bookingCode={bookingCode} />
          ) : (
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-2/3 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-slate-100">
                <div className="mb-3">
                  <h2 className="font-semibold text-slate-400 uppercase tracking-wider text-xs">Resumo da reserva</h2>
                </div>
                <FlightDetails flight={selectedFlight} />
                <TicketQuantitySelector 
                  quantity={ticketQuantity} 
                  onChange={handleTicketQuantityChange} 
                />
              </div>

              <div className="lg:w-1/3 p-6 lg:p-8 bg-slate-50 lg:bg-white">
                <div className="mb-3">
                  <h2 className="font-semibold text-slate-400 uppercase tracking-wider text-xs">Pagamento</h2>
                </div>
                <PurchaseSummary 
                  userMilesBalance={user.milesBalance}
                  totalPrice={totalPrice}
                  requiredMiles={requiredMiles}
                  milesToUse={milesToUse}
                  onMilesChange={handleMilesToUseChange}
                  milesDiscount={milesDiscount}
                  finalPrice={finalPrice}
                  onPurchase={handleConfirmPurchase}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;