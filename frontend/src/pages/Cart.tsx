import React, { useState, useEffect } from "react";
import { fetchAddressByCep } from "../utils/ViaCep";
import Header from "../components/organisms/Header";
import Footer from "../components/organisms/Footer";
import MaskedInput from "../components/atoms/MaskedInput";
import BasicInput from "../components/atoms/BasicInput";

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

    const [cartItems, setCartItems] = React.useState<CartItem[]>([
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

    //Calculos de total
    const [subtotal, setSubtotal] = useState(0);
    const [additionalFees, setAdditionalFees] = useState(20.00);

    //Atualizar o total ao adicionar/remover itens
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
        }


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
            <div className="flex flex-col min-h-screen bg-gray-100">
              <div className="container mx-auto px-4 py-8 flex-grow">
                <div className="text-sm text-gray-600 mb-4">
                  Carrinho 
                  <span className="font-bold"> Passo 1/2 </span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6">Itens no Carrinho</h2>
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="grid grid-cols-5 gap-4 items-center border-b pb-4">
                          <img 
                            alt={item.name} 
                            className="col-span-1 rounded-lg h-20 w-20 object-cover" 
                            src={item.imageUrl} 
                          />
                          <div className="col-span-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className="font-bold">{item.name}</h3>
                                <p className="text-sm text-gray-600">{item.description}</p>
                              </div>
                              <div className="flex space-x-4 items-center">
                                {item.options && (
                                  <select 
                                    className="border border-gray-300 rounded p-2"
                                    value={item.selectedOption}
                                    onChange={(e) => handleOptionChange(item.id, e.target.value)}
                                  >
                                    {item.options.map(option => (
                                      <option key={option} value={option}>{option}</option>
                                    ))}
                                  </select>
                                )}
                                <input 
                                  className="border border-gray-300 rounded p-2 w-16" 
                                  type="number" 
                                  min="1"
                                  value={item.quantity}
                                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                />
                                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                <button 
                                  onClick={() => removeItem(item.id)}
                                  className="text-gray-500 hover:text-red-500 transition-colors"
                                >
                                  <i className="fas fa-times"></i>
                                  <span>×</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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
                  </div>
                  <div className="bg-blue-500 text-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6">Detalhes do Passageiro</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <BasicInput
                          type="text" 
                          value={passengerFirstName}
                          placeholder="Nome" 
                          onChange={(e) => setPassengerFirstName(e.target.value)}
                          required
                          classNameAdd="w-full bg-gray-50 text-black"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <BasicInput 
                          type="text" 
                          value={passengerLastName}
                          placeholder="Sobrenome" 
                          onChange={(e) => setPassengerLastName(e.target.value)}
                          required
                          classNameAdd="w-full bg-gray-50 text-black"
                        />
                        <BasicInput 
                          type="date" 
                          value={passengerDate}
                          placeholder="Data de Nascimento" 
                          onChange={(e) => setPassengerDate(e.target.value)}
                          required
                          classNameAdd="w-full bg-gray-50 text-black"
                        />
                      </div>
                      
                      <BasicInput 
                        type="email" 
                        value={passengerEmail}
                        placeholder="Email" 
                        onChange={(e) => setPassengerEmail(e.target.value)}
                        required
                        classNameAdd="w-full bg-gray-50 text-black"
                      />
                      
                      <MaskedInput 
                        type="text" 
                        mask="000.000.000-00"
                        value={passengerCpf}
                        placeholder="CPF" 
                        onChange={(e) => setPassengerCpf(e.target.value)}
                        required
                        classNameAdd="w-full bg-gray-50 text-black"
                      />
                      
                      <MaskedInput 
                        type="tel" 
                        mask="(00) 00000-0000"
                        value={passengerPhone}
                        placeholder="Telefone" 
                        onChange={(e) => setPassengerPhone(e.target.value)}
                        required
                        classNameAdd="w-full bg-gray-50 text-black"
                      />
                      
                      <hr className="border-gray-300 my-4" />
                      <h3 className="font-bold text-lg mb-2">Endereço</h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <MaskedInput 
                          type="text" 
                          mask="00000-000"
                          value={passengerCep}
                          placeholder="CEP" 
                          onChange={(e) => setPassengerCep(e.target.value)}
                          onBlur={() => handleCepBlur(passengerCep)}
                          required
                          classNameAdd="w-full bg-gray-50 text-black"
                        />
                        <BasicInput 
                          type="text" 
                          value={passengerCountry}
                          placeholder="País" 
                          onChange={(e) => setPassengerCountry(e.target.value)}
                          required
                          classNameAdd="w-full bg-gray-50 text-black"
                        />
                      </div>
                      
                      {cepError && <p className="text-red-300 text-sm">{cepError}</p>}
                      
                      <div className="grid grid-cols-2 gap-4">
                        <BasicInput 
                          type="text" 
                          value={passengerState}
                          placeholder="Estado" 
                          onChange={(e) => setPassengerState(e.target.value)}
                          required
                          classNameAdd="w-full bg-gray-50 text-black"
                          disabled={!!passengerCep && !cepError}
                        />
                        <BasicInput 
                          type="text" 
                          value={passengerCity}
                          placeholder="Cidade" 
                          onChange={(e) => setPassengerCity(e.target.value)}
                          required
                          classNameAdd="w-full bg-gray-50 text-black"
                          disabled={!!passengerCep && !cepError}
                        />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                          <BasicInput 
                            type="text" 
                            value={passengerStreet}
                            placeholder="Rua" 
                            onChange={(e) => setPassengerStreet(e.target.value)}
                            required
                            classNameAdd="w-full bg-gray-50 text-black"
                            disabled={!!passengerCep && !cepError}
                          />
                        </div>
                        <BasicInput 
                          type="text" 
                          value={passengerNumber}
                          placeholder="Número" 
                          onChange={(e) => setPassengerNumber(e.target.value)}
                          required
                          classNameAdd="w-full bg-gray-50 text-black"
                        />
                      </div>
                      
                      <BasicInput 
                        type="text" 
                        value={passengerComplement}
                        placeholder="Complemento" 
                        onChange={(e) => setPassengerComplement(e.target.value)}
                        classNameAdd="w-full bg-gray-50 text-black"
                      />
                      
                      <div className="flex items-center">
                        <input 
                          className="mr-2" 
                          id="billing" 
                          type="checkbox"
                          checked={useSameForBilling}
                          onChange={(e) => setUseSameForBilling(e.target.checked)}
                        />
                        <label className="text-sm" htmlFor="billing">
                          Usar mesmo endereço para cobrança
                        </label>
                      </div>
                      
                      <button 
                        className="bg-black text-white py-2 px-4 rounded w-full hover:bg-gray-800 transition-colors" 
                        type="submit"
                      >
                        Prosseguir para Pagamento &gt;
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          );
        };
        
        export default Cart;