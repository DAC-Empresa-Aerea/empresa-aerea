import React from 'react';

interface MileageSelectorProps {
  milesToUse: number;
  userMilesBalance: number;
  requiredMilesForFullPayment: number;
  onMilesChange: (value: number) => void;
}

const MileageSelector: React.FC<MileageSelectorProps> = ({
  milesToUse,
  userMilesBalance,
  requiredMilesForFullPayment,
  onMilesChange
}) => {
  const maxUsableMiles = Math.min(userMilesBalance, requiredMilesForFullPayment);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    onMilesChange(value);
  };

  return (
    <div className="mb-6">
      <label htmlFor="milesToUse" className="block text-sm text-gray-600 mb-1">
        Utilizar milhas (máx: {maxUsableMiles.toLocaleString()})
      </label>
      <input
        id="milesToUse"
        type="range"
        min="0"
        max={maxUsableMiles}
        value={milesToUse}
        onChange={handleChange}
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