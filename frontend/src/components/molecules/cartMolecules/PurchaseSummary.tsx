import React from 'react';
import MileageSelector from './MileageSelector';
import Customer from "../../../types/Customer";

interface PurchaseSummaryProps {
  user: Customer;
  totalPrice: number;
  requiredMiles: number;
  milesToUse: number;
  milesDiscount: number;
  finalPrice: number;
  onMilesChange: (value: number) => void;
  onConfirmPurchase: () => void;
}

const PurchaseSummary: React.FC<PurchaseSummaryProps> = ({
  totalPrice,
  requiredMiles,
  milesToUse,
  milesDiscount,
  finalPrice,
  user,
  onConfirmPurchase,
  onMilesChange
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h2 className="font-bold text-lg mb-4">Resumo</h2>

      <div className="mb-4">
        <p className="text-sm text-gray-600">Seu saldo de milhas</p>
        <p className="font-bold">{user.saldo_milhas.toLocaleString()} milhas</p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">Valor total</p>
        <p className="font-bold">R$ {totalPrice.toFixed(2)}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">Milhas necessárias para 100%</p>
        <p className="font-bold">{requiredMiles.toLocaleString()} milhas</p>
      </div>

      <MileageSelector
        milesToUse={milesToUse}
        userMilesBalance={user.saldo_milhas}
        requiredMilesForFullPayment={requiredMiles}
        onMilesChange={onMilesChange}
      />

      <div className="mb-6">
        <p className="text-sm text-gray-600">Desconto de milhas</p>
        <p className="font-bold text-green-600">
          -R$ {milesDiscount.toFixed(2)}
        </p>
      </div>

      <div className="mb-6 pt-4 border-t">
        <p className="text-lg">Valor a pagar</p>
        <p className="text-2xl font-bold">R$ {finalPrice.toFixed(2)}</p>
      </div>

      <button
        onClick={onConfirmPurchase}
        className="bg-blue-600 text-white py-3 px-4 rounded w-full hover:bg-blue-700 transition-colors"
      >
        Confirmar Compra
      </button>
    </div>
  );
};

export default PurchaseSummary;