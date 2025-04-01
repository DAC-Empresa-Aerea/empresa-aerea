import React from 'react';

interface MilesSliderProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
  step: number;
  markers: number[];
}

const MilesSlider: React.FC<MilesSliderProps> = ({ 
  value,
  onChange,
  min,
  max,
  step,
  markers
}) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor="miles" className="block text-sm font-medium text-gray-700">
          Quantidade personalizada
        </label>
        <span className="text-lg font-bold text-blue-600">{value.toLocaleString()} milhas</span>
      </div>
      
      <input
        type="range"
        id="miles"
        name="miles"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
      
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        {markers.map((marker, index) => (
          <span key={index}>{marker.toLocaleString()}</span>
        ))}
      </div>
    </div>
  );
};

export default MilesSlider;