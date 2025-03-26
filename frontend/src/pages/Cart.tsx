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
  const [selectedFlight, setSelectedFlight] = useState<SelectedFlight>(mockSelectedFlight);
  
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
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold mb-6">Finalizar compra</h1>
        
        {bookingCode ? (
          <BookingConfirmation bookingCode={bookingCode} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Detalhes do voo e quantidade de passagens */}
            <div className="md:col-span-2">
              <FlightDetails flight={selectedFlight} />
              <TicketQuantitySelector 
                quantity={ticketQuantity} 
                onChange={handleTicketQuantityChange} 
              />
            </div>
            
            {/* Resumo da compra */}
            <div>
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
  );
};

export default Cart;