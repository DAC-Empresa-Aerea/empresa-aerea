import React from "react";

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
  markers,
}) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <label
          htmlFor="miles"
          className="block text-sm font-medium text-gray-700"
        >
          Quantidade personalizada
        </label>
        <div className="flex items-center gap-0.5">
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => {
              if (e.target.value === "") {
                onChange({ ...e, target: { ...e.target, value: "0" } });
              } else {
                onChange(e);
              }
            }}
            className="w-24 bg-transparent outline-none border-1 rounded border-blue-600 text-right text-lg font-bold text-blue-600 focus:ring-0 focus:border-blue-800 appearance-none hide-arrows"
            style={{ fontSize: 18 }}
          />
          <span className="text-lg font-bold text-blue-600 ml-1">milhas</span>
        </div>
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
