import React from 'react';

interface MileageSelectorProps {
  milesToUse: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  userMilesBalance: number;
  requiredMilesForFullPayment: number;
}

const MileageSelector: React.FC<MileageSelectorProps> = ({
  milesToUse,
  onChange,
  userMilesBalance,
  requiredMilesForFullPayment
}) => {
  const maxUsableMiles = Math.min(userMilesBalance, requiredMilesForFullPayment);
  
  return (
    <div className="mb-6">
      <label htmlFor="milesToUse" className="block text-sm text-gray-600 mb-1">
        Utilizar milhas (máx: {userMilesBalance.toLocaleString()})
      </label>
      <input
        id="milesToUse"
        type="range"
        min="0"
        max={maxUsableMiles}
        value={milesToUse}
        onChange={onChange}
        className="w-full"
      />
      <div className="flex justify-between text-xs mt-1">
        <span>0</span>
        <span>{milesToUse.toLocaleString()} milhas</span>
        <span>{maxUsableMiles.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default MileageSelector;