import { useState } from "react";
import Header from "../components/organisms/Header";
import Footer from "../components/organisms/Footer";
import AvailableFlights from "../components/organisms/AvailableFlights"; // Ajuste o caminho conforme necessário
import { Flight } from "../components/atoms/FlightBasicInfo";

const CustomerHomePage = () => {
  // Simulação de dados que viriam da API
  const [flights, setFlights] = useState<Flight[]>([
    { number: 201, departure: "08:00", arrival: "10:00" },
    { number: 202, departure: "12:00", arrival: "14:00" },
    { number: 203, departure: "16:00", arrival: "18:00" },
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4">
        <AvailableFlights flights={flights} />
      </main>
      <Footer />
    </div>
  );
};

export default CustomerHomePage;
