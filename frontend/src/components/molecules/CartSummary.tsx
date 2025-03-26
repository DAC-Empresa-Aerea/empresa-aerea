import React from 'react';

interface CartSummaryProps {
  subtotal: number;
  additionalFees: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal, additionalFees }) => {
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center">
        <p className="font-bold">Subtotal:</p>
        <p className="font-bold">${subtotal.toFixed(2)}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-bold">Taxa de serviço:</p>
        <p className="font-bold">${additionalFees.toFixed(2)}</p>
      </div>
      <div className="flex justify-between items-center mt-4 pt-4 border-t">
        <p className="text-xl font-bold">Total:</p>
        <p className="text-xl font-bold">${(subtotal + additionalFees).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartSummary;