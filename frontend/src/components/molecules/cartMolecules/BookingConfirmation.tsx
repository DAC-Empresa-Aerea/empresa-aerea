import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BookingConfirmationProps {
  bookingCode: string;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ bookingCode }) => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-8">
      <div className="text-4xl text-green-600 mb-4">
        ✓
      </div>
      <h2 className="text-3xl font-bold mb-2">Reserva Confirmada!</h2>
      <div className="bg-blue-100 p-4 rounded-lg inline-block mb-4">
        <p className="text-2xl font-mono font-bold">{bookingCode}</p>
        <p className="text-sm text-gray-600">Seu código de reserva</p>
      </div>
      <p className="mb-6">Guarde este código para check-in e embarque.</p>
      <button 
        onClick={() => navigate('/minhas-reservas')} 
        className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
      >
        Ver minhas reservas
      </button>
    </div>
  );
};

export default BookingConfirmation;