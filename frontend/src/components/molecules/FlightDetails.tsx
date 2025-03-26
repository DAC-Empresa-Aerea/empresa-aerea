import React from 'react';
import { SelectedFlight } from '../../types/flightTypes';

interface FlightDetailsProps {
  flight: SelectedFlight;
}

const FlightDetails: React.FC<FlightDetailsProps> = ({ flight }) => {
  return (
    <div className="border rounded-md p-4 mb-6">
      <h2 className="font-bold text-lg mb-4">Detalhes do voo</h2>
      
      <div className="flex justify-between mb-2">
        <div>
          <p className="text-sm text-gray-600">Voo</p>
          <p className="font-bold">{flight.airline} {flight.flightNumber}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Data</p>
          <p className="font-bold">
            {new Date(flight.departureDate).toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>
      
      <div className="flex items-center my-4">
        <div className="text-center">
          <p className="text-xl font-bold">{flight.departureTime}</p>
          <p className="text-sm">{flight.origin}</p>
        </div>
        
        <div className="flex-1 mx-4 border-t-2 border-gray-300 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white px-2 text-gray-500">Direto</span>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-xl font-bold">{flight.arrivalTime}</p>
          <p className="text-sm">{flight.destination}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-sm text-gray-600">Preço por assento</p>
        <p className="font-bold text-lg">R$ {flight.seatPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default FlightDetails;