import React from 'react';
import BasicInput from '../atoms/BasicInput';
import MaskedInput from '../atoms/MaskedInput';

interface AddressFormProps {
  cep: string;
  setCep: (value: string) => void;
  country: string;
  setCountry: (value: string) => void;
  state: string;
  setState: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  street: string;
  setStreet: (value: string) => void;
  number: string;
  setNumber: (value: string) => void;
  complement: string;
  setComplement: (value: string) => void;
  cepError: string;
  handleCepBlur: (cep: string) => void;
  useSameForBilling: boolean;
  setUseSameForBilling: (value: boolean) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  cep, setCep,
  country, setCountry,
  state, setState,
  city, setCity,
  street, setStreet,
  number, setNumber,
  complement, setComplement,
  cepError,
  handleCepBlur,
  useSameForBilling,
  setUseSameForBilling
}) => {
  return (
    <>
      <h3 className="font-bold text-lg mb-2">Endereço</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <MaskedInput 
          type="text" 
          mask="00000-000"
          value={cep}
          placeholder="CEP" 
          onChange={(e) => setCep(e.target.value)}
          onBlur={() => handleCepBlur(cep)}
          required
          classNameAdd="w-full bg-gray-50 text-black"
        />
        <BasicInput 
          type="text" 
          value={country}
          placeholder="País" 
          onChange={(e) => setCountry(e.target.value)}
          required
          classNameAdd="w-full bg-gray-50 text-black"
        />
      </div>
      
      {cepError && <p className="text-red-300 text-sm">{cepError}</p>}
      
      <div className="grid grid-cols-2 gap-4">
        <BasicInput 
          type="text" 
          value={state}
          placeholder="Estado" 
          onChange={(e) => setState(e.target.value)}
          required
          classNameAdd="w-full bg-gray-50 text-black"
          disabled={!!cep && !cepError}
        />
        <BasicInput 
          type="text" 
          value={city}
          placeholder="Cidade" 
          onChange={(e) => setCity(e.target.value)}
          required
          classNameAdd="w-full bg-gray-50 text-black"
          disabled={!!cep && !cepError}
        />
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <BasicInput 
            type="text" 
            value={street}
            placeholder="Rua" 
            onChange={(e) => setStreet(e.target.value)}
            required
            classNameAdd="w-full bg-gray-50 text-black"
            disabled={!!cep && !cepError}
          />
        </div>
        <BasicInput 
          type="text" 
          value={number}
          placeholder="Número" 
          onChange={(e) => setNumber(e.target.value)}
          required
          classNameAdd="w-full bg-gray-50 text-black"
        />
      </div>
      
      <BasicInput 
        type="text" 
        value={complement}
        placeholder="Complemento" 
        onChange={(e) => setComplement(e.target.value)}
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
    </>
  );
};

export default AddressForm;