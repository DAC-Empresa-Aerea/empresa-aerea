import React from 'react';

interface MilesOptionsSelectorProps {
  options: number[];
  selectedValue: number;
  onChange: (value: number) => void;
}

const MilesOptionsSelector: React.FC<MilesOptionsSelectorProps> = ({ 
  options, 
  selectedValue, 
  onChange 
}) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
      {options.map(option => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`py-3 px-4 rounded-lg border ${
            selectedValue === option 
              ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {option.toLocaleString()}
        </button>
      ))}
    </div>
  );
};

export default MilesOptionsSelector;