import React, { useEffect, useState } from "react";
import { User } from "../types/flightTypes";
import MilesPurchaseHeader from "../components/miles/MilesPurchaseHeader";
import BalanceDisplay from "../components/miles/BalanceDisplay";
import MilesOptionsSelector from "../components/miles/MilesOptionsSelector";
import MilesSlider from "../components/miles/MilesSlider";
import PriceSummary from "../components/miles/PriceSummary";
import TransactionConfirmation from "../components/miles/TransactionConfirmation";

// Dados simulados de usuário
const mockUser: User = {
  id: "user123",
  name: "João Silva",
  milesBalance: 5000, // saldo de milhas
};

interface MilesTransaction {
  id: string;
  userId: string;
  date: Date;
  amountInReais: number;
  milesAmount: number;
  description: string;
}

const BuyMiles: React.FC = () => {
  const [user, setUser] = useState<User>(mockUser);
  const [milesAmount, setMilesAmount] = useState<number>(1000);
  const [priceInReais, setPriceInReais] = useState<number>(0);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [transaction, setTransaction] = useState<MilesTransaction | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Proporção fixa: 1 milha = R$ 5,00
  const MILES_PRICE_RATIO = 5.0;

  // Atualizar preço quando a quantidade de milhas muda
  useEffect(() => {
    setPriceInReais(milesAmount * MILES_PRICE_RATIO);
  }, [milesAmount]);

  // Opções pré-definidas de milhas para compra
  const milesOptions = [25, 50, 100, 200, 500];
  
  // Valores para o slider
  const sliderMin = 10;
  const sliderMax = 2000;
  const sliderStep = 10;
  const sliderMarkers = [10, 50, 500, 1000, 1500, 2000];

  // Processar a compra
  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      // Atualizar o saldo de milhas do usuário
      const updatedUser = {
        ...user,
        milesBalance: user.milesBalance + milesAmount,
      };

      // Criar registro da transação
      const newTransaction: MilesTransaction = {
        id: Math.random().toString(36).substring(2, 15),
        userId: updatedUser.id,
        date: new Date(),
        amountInReais: priceInReais,
        milesAmount: milesAmount,
        description: "COMPRA DE MILHAS",
      };

      // Atualizar o estado
      setUser(updatedUser);
      setTransaction(newTransaction);
      setShowConfirmation(true);
      setIsProcessing(false);

      console.log("Transação realizada:", newTransaction);
    }, 2000);
  };

  // Iniciar nova compra
  const handleNewPurchase = () => {
    setShowConfirmation(false);
    setMilesAmount(100);
  };

  // Formatar valores monetários
  const formatCurrency = (value: number): string => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Atualizar valor das milhas com o slider
  const handleMilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMilesAmount(parseInt(e.target.value));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <MilesPurchaseHeader 
          title="Comprar Milhas" 
          subtitle="Aumente seu saldo de milhas e aproveite descontos em passagens" 
        />

        {showConfirmation ? (
          // Tela de confirmação após compra
          <TransactionConfirmation
            transaction={transaction}
            user={user}
            formatCurrency={formatCurrency}
            onNewPurchase={handleNewPurchase}
          />
        ) : (
          // Tela de compra
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Selecione a quantidade de milhas</h2>
                <BalanceDisplay balance={user.milesBalance} />
              </div>

              <form onSubmit={handlePurchase}>
                {/* Opções pré-definidas */}
                <MilesOptionsSelector
                  options={milesOptions}
                  selectedValue={milesAmount}
                  onChange={setMilesAmount}
                />

                {/* Slider personalizado */}
                <MilesSlider
                  value={milesAmount}
                  onChange={handleMilesChange}
                  min={sliderMin}
                  max={sliderMax}
                  step={sliderStep}
                  markers={sliderMarkers}
                />

                {/* Preço e botão de compra */}
                <PriceSummary
                  milesAmount={milesAmount}
                  priceInReais={priceInReais}
                  milesRatio={MILES_PRICE_RATIO}
                  isProcessing={isProcessing}
                  onSubmit={handlePurchase}
                  formatCurrency={formatCurrency}
                />
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyMiles;