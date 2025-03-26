import React, { useState, useEffect } from "react";
import { fetchAddressByCep } from "../utils/ViaCep";
import CartItem from "../components/molecules/CartItem";
import CartSummary from "../components/molecules/CartSummary";
import PassengerInfoForm from "../components/molecules/PassengerInfo";
import AddressForm from "../components/molecules/AddressForm";

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  options?: string[]
  selectedOption?: string
}

const Cart: React.FC = () => {
  // Estado do carrinho
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Business Class Flight Ticket",
      description: "Blue",
      price: 417.47,
      quantity: 2,
      imageUrl: "https://placehold.co/100x100",
      options: ["MIA"],
      selectedOption: "MIA"
    },
    {
      id: 2,
      name: "In-flight Meal",
      description: "Sliced",
      price: 15.99,
      quantity: 1,
      imageUrl: "https://placehold.co/100x100",
      options: ["Vegetariano"],
      selectedOption: "Vegetariano"
    },
    {
      id: 3,
      name: "Flight Control",
      description: "Red",
      price: 50.49,
      quantity: 1,
      imageUrl: "https://placehold.co/100x100",
      options: ["3m"],
      selectedOption: "3m"
    }
  ]);

  // Perfil do passageiro
  const [passengerFirstName, setPassengerFirstName] = useState("");
  const [passengerLastName, setPassengerLastName] = useState("");
  const [passengerEmail, setPassengerEmail] = useState("");
  const [passengerCpf, setPassengerCpf] = useState("");
  const [passengerPhone, setPassengerPhone] = useState("");
  const [passengerDate, setPassengerDate] = useState("");

  // Endereço do passageiro
  const [passengerCep, setPassengerCep] = useState("");
  const [passengerCity, setPassengerCity] = useState("");
  const [passengerState, setPassengerState] = useState("");
  const [passengerCountry, setPassengerCountry] = useState("");
  const [passengerStreet, setPassengerStreet] = useState("");
  const [passengerNumber, setPassengerNumber] = useState("");
  const [passengerComplement, setPassengerComplement] = useState("");
  const [cepError, setCepError] = useState("");

  // Endereço de faturamento
  const [useSameForBilling, setUseSameForBilling] = useState(false);

  // Cálculos de total
  const [subtotal, setSubtotal] = useState(0);
  const [additionalFees, setAdditionalFees] = useState(20.00);

  // Atualizar o total ao adicionar/remover itens
  useEffect(() => {
    const calculatedSubtotal = cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
    setSubtotal(calculatedSubtotal);
  }, [cartItems]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!passengerFirstName || !passengerLastName || !passengerEmail || !passengerCpf) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    console.log("Order submission: ", { 
      passengerDetails: {
        firstName: passengerFirstName,
        lastName: passengerLastName,
        email: passengerEmail,
        cpf: passengerCpf,
        phone: passengerPhone,
        dateOfBirth: passengerDate
      },
      address: {
        cep: passengerCep,
        city: passengerCity,
        state: passengerState,
        country: passengerCountry,
        street: passengerStreet,
        number: passengerNumber,
        complement: passengerComplement
      },
      useSameForBilling,
      order: {
        items: cartItems,
        subtotal,
        additionalFees,
        total: subtotal + additionalFees
      }
    });
    alert("Redirecionando para a página de pagamento...");
  };

  const handleCepBlur = async (cep: string) => {
    if (cep && cep.length >= 8) {
      const { state, city, street, error } = await fetchAddressByCep(cep);
      if (error) {
        setCepError(error);
      } else {
        setCepError("");
        setPassengerState(state);
        setPassengerCity(city);
        setPassengerStreet(street);
      }
    }
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleOptionChange = (id: number, option: string) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, selectedOption: option } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <>
      <div className="text-sm text-gray-600 mb-4">
        Carrinho 
        <span className="font-bold"> Passo 1/2 </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Itens no Carrinho</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                quantity={item.quantity}
                imageUrl={item.imageUrl}
                options={item.options}
                selectedOption={item.selectedOption}
                onQuantityChange={handleQuantityChange}
                onOptionChange={handleOptionChange}
                onRemove={removeItem}
              />
            ))}
          </div>
          <CartSummary 
            subtotal={subtotal} 
            additionalFees={additionalFees} 
          />
        </div>
        <div className="bg-blue-500 text-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Detalhes do Passageiro</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <PassengerInfoForm
              firstName={passengerFirstName}
              setFirstName={setPassengerFirstName}
              lastName={passengerLastName}
              setLastName={setPassengerLastName}
              email={passengerEmail}
              setEmail={setPassengerEmail}
              cpf={passengerCpf}
              setCpf={setPassengerCpf}
              phone={passengerPhone}
              setPhone={setPassengerPhone}
              date={passengerDate}
              setDate={setPassengerDate}
            />
            
            <hr className="border-gray-300 my-4" />
            
            <AddressForm
              cep={passengerCep}
              setCep={setPassengerCep}
              country={passengerCountry}
              setCountry={setPassengerCountry}
              state={passengerState}
              setState={setPassengerState}
              city={passengerCity}
              setCity={setPassengerCity}
              street={passengerStreet}
              setStreet={setPassengerStreet}
              number={passengerNumber}
              setNumber={setPassengerNumber}
              complement={passengerComplement}
              setComplement={setPassengerComplement}
              cepError={cepError}
              handleCepBlur={handleCepBlur}
              useSameForBilling={useSameForBilling}
              setUseSameForBilling={setUseSameForBilling}
            />
            
            <button 
              className="bg-black text-white py-2 px-4 rounded w-full hover:bg-gray-800 transition-colors" 
              type="submit"
            >
              Prosseguir para Pagamento &gt;
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Cart;