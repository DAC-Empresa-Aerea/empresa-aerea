import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/loginContext";
import { queryClient } from "../../App";

import MilesPurchaseHeader from "../../components/organisms/milesOrganisms/MilesPurchaseHeader";
import BalanceDisplay from "../../components/molecules/milesMolecules/BalanceDisplay";
import MilesOptionsSelector from "../../components/molecules/milesMolecules/MilesOptionsSelector";
import MilesSlider from "../../components/molecules/milesMolecules/MilesSlider";
import PriceSummary from "../../components/molecules/milesMolecules/PriceSummary";
import TransactionConfirmation from "../../components/organisms/milesOrganisms/TransactionConfirmation";
import { useUpdateMiles } from "../../hooks/customers/useUpdateMiles";
import { useCustomer } from "../../hooks/customers/useCustomer";

const BuyMiles: React.FC = () => {
  const { user, setUser } = useAuth();
  const [milesAmount, setMilesAmount] = useState<number>(1000);
  const [priceInReais, setPriceInReais] = useState<number>(0);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [transaction, setTransaction] = useState<any | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const navigate = useNavigate();

  const buyMiles = useUpdateMiles(user?.codigo || 0);
  const getCustomer = useCustomer(user?.codigo || 0);

  const goToStatement = () => {
    navigate("/customer/consultStatement");
  };

  const MILES_PRICE_RATIO = 5.0;

  useEffect(() => {
    setPriceInReais(milesAmount * MILES_PRICE_RATIO);
  }, [milesAmount]);

  const milesOptions = [25, 50, 100, 200, 500];
  const sliderMin = 10;
  const sliderMax = 1000;
  const sliderStep = 10;
  const sliderMarkers = [10, 250, 500, 750, 1000];
  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsProcessing(true);

    try {
      await buyMiles.mutateAsync({
        quantidade: milesAmount,
      });
      const { data: updatedUser } = await getCustomer.refetch();
      if (updatedUser) {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        await queryClient.invalidateQueries({ queryKey: ["customer"] });
      }

      setTransaction({
        quantidade_milhas: milesAmount,
        valor_reais: priceInReais,
        data: new Date().toLocaleString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        descricao: "Compra de milhas",
      });
      setShowConfirmation(true);
    } catch (error) {
      alert(`${error}: Erro ao processar a compra de milhas.`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleNewPurchase = () => {
    setShowConfirmation(false);
    setMilesAmount(1000);
  };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };
  const handleMilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMilesAmount(parseInt(e.target.value));
  };

  if (!user || !("saldo_milhas" in user)) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <MilesPurchaseHeader
          title="Comprar Milhas"
          subtitle="Aumente seu saldo de milhas e aproveite descontos em passagens"
        />

        {showConfirmation ? (
          <TransactionConfirmation
            transaction={transaction}
            user={user}
            formatCurrency={formatCurrency}
            onNewPurchase={handleNewPurchase}
          />
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Selecione a quantidade de milhas
                </h2>
                <BalanceDisplay balance={user.saldo_milhas} />
              </div>
              <form onSubmit={handlePurchase}>
                <MilesOptionsSelector
                  options={milesOptions}
                  selectedValue={milesAmount}
                  onChange={setMilesAmount}
                />
                <MilesSlider
                  value={milesAmount}
                  onChange={handleMilesChange}
                  min={sliderMin}
                  max={sliderMax}
                  step={sliderStep}
                  markers={sliderMarkers}
                />
                <PriceSummary
                  milesAmount={milesAmount}
                  priceInReais={priceInReais}
                  milesRatio={MILES_PRICE_RATIO}
                  isProcessing={isProcessing}
                  onSubmit={handlePurchase}
                  formatCurrency={formatCurrency}
                />
              </form>{" "}
              {/* Botão de ir para o extrato */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={goToStatement}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Ver Extrato
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyMiles;
