import React from 'react';

interface TicketQuantitySelectorProps {
    quantity: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    maxQuantity?: number;
}

const TicketQuantitySelector: React.FC<TicketQuantitySelectorProps> = ({ 
    quantity, onChange, maxQuantity = 10 
}) => {
    const handleDecrease = () => {
        if (quantity > 1) onChange({ target: { value: String(quantity - 1) } } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleIncrease = () => {
        if (quantity < maxQuantity) onChange({ target: { value: String(quantity + 1) } } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
        <div className="py-5 border-t border-slate-100">
            <h3 className="text-lg font-semibold mb-4 text-slate-900">Número de passageiros</h3>
            <div className="flex items-center justify-between max-w-xs">
                <label htmlFor="ticketQuantity" className="font-medium text-slate-700">Quantidade</label>
                <div className="flex items-center">
                    <button type="button" onClick={handleDecrease} disabled={quantity <= 1}
                        className="w-9 h-9 flex items-center justify-center rounded-l-md border border-r-0 border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Diminuir quantidade">−</button>
                    <input id="ticketQuantity" type="number" min="1" max={maxQuantity} value={quantity} onChange={onChange}
                        className="w-12 h-9 text-center border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    <button type="button" onClick={handleIncrease} disabled={quantity >= maxQuantity}
                        className="w-9 h-9 flex items-center justify-center rounded-r-md border border-l-0 border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Aumentar quantidade">+</button>
                </div>
            </div>
        </div>
    );
};

export default TicketQuantitySelector;
