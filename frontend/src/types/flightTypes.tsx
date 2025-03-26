export interface SelectedFlight {
    id: string;
    origin: string;
    destination: string;
    departureDate: string;
    departureTime: string;
    arrivalDate: string;
    arrivalTime: string;
    seatPrice: number;
    airline: string;
    flightNumber: string;
  }
  
  export interface User {
    id: string;
    name: string;
    milesBalance: number;
  }