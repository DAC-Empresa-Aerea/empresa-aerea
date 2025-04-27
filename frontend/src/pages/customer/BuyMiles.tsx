import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/loginContext";
import { updateCustomerMiles, createMilesTransaction } from "../../services/milesService";
import { getCustomerByCpf } from "../../services/customerService";

import MilesPurchaseHeader from "../../components/organisms/milesOrganisms/MilesPurchaseHeader";
import BalanceDisplay from "../../components/molecules/milesMolecules/BalanceDisplay";
import MilesOptionsSelector from "../../components/molecules/milesMolecules/MilesOptionsSelector";
import MilesSlider from "../../components/molecules/milesMolecules/MilesSlider";
import PriceSummary from "../../components/molecules/milesMolecules/PriceSummary";
import TransactionConfirmation from "../../components/organisms/milesOrganisms/TransactionConfirmation";
import {MilesTransactionType} from "../../types/Miles";

const BuyMiles: React.FC = () => {
  const { user, setUser } = useAuth();
  const [milesAmount, setMilesAmount] = useState<number>(1000);
  const [priceInReais, setPriceInReais] = useState<number>(0);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [transaction, setTransaction] = useState<any | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

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
    if (!user || !("codigo" in user)) return;

    setIsProcessing(true);

    try {
      const result = await updateCustomerMiles(user.codigo, milesAmount);

      const newTransaction = await createMilesTransaction({
        codigo_cliente: user.codigo.toString(),
        valor_reais: priceInReais,
        quantidade_milhas: milesAmount,
        descricao: "COMPRA DE MILHAS",
        codigo_reserva: "",
        tipo: MilesTransactionType.ENTRADA,
      });

      setTransaction(newTransaction);
      setShowConfirmation(true);
    } catch (err) {
      alert("Erro ao processar a compra de milhas.");
    } finally {
      setIsProcessing(false);

      try {
        const response = await getCustomerByCpf(user.cpf);
        const updatedUser = response;
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } catch (error) {
        console.error("Erro ao atualizar os dados do usuário:", error);
      }
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
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyMiles;
