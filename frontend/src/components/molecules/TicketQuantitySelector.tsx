import React from 'react';

interface TicketQuantitySelectorProps {
  quantity: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxQuantity?: number;
}

const TicketQuantitySelector: React.FC<TicketQuantitySelectorProps> = ({ 
  quantity, 
  onChange,
  maxQuantity = 10
}) => {
  return (
    <div className="border rounded-md p-4 mb-6">
      <h2 className="font-bold text-lg mb-4">Passagens</h2>
      <div className="flex items-center justify-between">
        <label htmlFor="ticketQuantity">Quantidade de passagens:</label>
        <input
          id="ticketQuantity"
          type="number"
          min="1"
          max={maxQuantity}
          value={quantity}
          onChange={onChange}
          className="border rounded p-2 w-20 text-right"
        />
      </div>
    </div>
  );
};

export default TicketQuantitySelector;