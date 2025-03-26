import React from 'react';
import MileageSelector from './MileageSelector';

interface PurchaseSummaryProps {
  userMilesBalance: number;
  totalPrice: number;
  requiredMiles: number;
  milesToUse: number;
  onMilesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  milesDiscount: number;
  finalPrice: number;
  onPurchase: () => void;
}

const PurchaseSummary: React.FC<PurchaseSummaryProps> = ({
  userMilesBalance,
  totalPrice,
  requiredMiles,
  milesToUse,
  onMilesChange,
  milesDiscount,
  finalPrice,
  onPurchase
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h2 className="font-bold text-lg mb-4">Resumo</h2>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600">Seu saldo de milhas</p>
        <p className="font-bold">{userMilesBalance.toLocaleString()} milhas</p>
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
        onChange={onMilesChange}
        userMilesBalance={userMilesBalance}
        requiredMilesForFullPayment={requiredMiles}
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
        onClick={onPurchase}
        className="bg-blue-600 text-white py-3 px-4 rounded w-full hover:bg-blue-700 transition-colors"
      >
        Confirmar Compra
      </button>
    </div>
  );
};

export default PurchaseSummary;