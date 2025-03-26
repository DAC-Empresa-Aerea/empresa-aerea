import React from 'react';
import BasicInput from '../atoms/BasicInput';
import MaskedInput from '../atoms/MaskedInput';

interface PassengerInfoProps {
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  cpf: string;
  setCpf: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  date: string;
  setDate: (value: string) => void;
}

const PassengerInfo: React.FC<PassengerInfoProps> = ({
  firstName, setFirstName,
  lastName, setLastName,
  email, setEmail,
  cpf, setCpf,
  phone, setPhone,
  date, setDate
}) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <BasicInput
          type="text" 
          value={firstName}
          placeholder="Nome" 
          onChange={(e) => setFirstName(e.target.value)}
          required
          classNameAdd="w-full bg-gray-50 text-black"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <BasicInput 
          type="text" 
          value={lastName}
          placeholder="Sobrenome" 
          onChange={(e) => setLastName(e.target.value)}
          required
          classNameAdd="w-full bg-gray-50 text-black"
        />
        <BasicInput 
          type="date" 
          value={date}
          placeholder="Data de Nascimento" 
          onChange={(e) => setDate(e.target.value)}
          required
          classNameAdd="w-full bg-gray-50 text-black"
        />
      </div>
      
      <BasicInput 
        type="email" 
        value={email}
        placeholder="Email" 
        onChange={(e) => setEmail(e.target.value)}
        required
        classNameAdd="w-full bg-gray-50 text-black"
      />
      
      <MaskedInput 
        type="text" 
        mask="000.000.000-00"
        value={cpf}
        placeholder="CPF" 
        onChange={(e) => setCpf(e.target.value)}
        required
        classNameAdd="w-full bg-gray-50 text-black"
      />
      
      <MaskedInput 
        type="tel" 
        mask="(00) 00000-0000"
        value={phone}
        placeholder="Telefone" 
        onChange={(e) => setPhone(e.target.value)}
        required
        classNameAdd="w-full bg-gray-50 text-black"
      />
    </>
  );
};

export default PassengerInfo;