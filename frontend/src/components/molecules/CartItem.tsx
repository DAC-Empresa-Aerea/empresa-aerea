import React from 'react';

interface CartItemProps {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  options?: string[];
  selectedOption?: string;
  onQuantityChange: (id: number, quantity: number) => void;
  onOptionChange: (id: number, option: string) => void;
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  description,
  price,
  quantity,
  imageUrl,
  options,
  selectedOption,
  onQuantityChange,
  onOptionChange,
  onRemove
}) => {
  return (
    <div className="grid grid-cols-5 gap-4 items-center border-b pb-4">
      <img 
        alt={name} 
        className="col-span-1 rounded-lg h-20 w-20 object-cover" 
        src={imageUrl} 
      />
      <div className="col-span-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold">{name}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          <div className="flex space-x-4 items-center">
            {options && (
              <select 
                className="border border-gray-300 rounded p-2"
                value={selectedOption}
                onChange={(e) => onOptionChange(id, e.target.value)}
              >
                {options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            )}
            <input 
              className="border border-gray-300 rounded p-2 w-16" 
              type="number" 
              min="1"
              value={quantity}
              onChange={(e) => onQuantityChange(id, parseInt(e.target.value))}
            />
            <p className="font-bold">${(price * quantity).toFixed(2)}</p>
            <button 
              onClick={() => onRemove(id)}
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              <span>×</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;