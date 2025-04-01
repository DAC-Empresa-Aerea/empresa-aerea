import React from 'react';

interface BalanceDisplayProps {
  balance: number;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ balance }) => {
  return (
    <div className="bg-blue-100 rounded-full px-3 py-1">
      <p className="text-sm font-medium text-blue-800">
        Saldo: {balance.toLocaleString()} milhas
      </p>
    </div>
  );
};

export default BalanceDisplay;