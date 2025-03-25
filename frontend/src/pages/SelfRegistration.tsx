import { useState } from "react";
import LogoImage from "../components/atoms/LogoImage";
import BasicInput from "../components/atoms/BasicInput";
import MaskedInput from "../components/atoms/MaskedInput";  // Importando o MaskedInput
import { fetchAddressByCep } from "../utils/ViaCep";  // Importando a função para buscar o endereço
import SubmitButton from "../components/atoms/SubmitButton";

const SelfRegistration = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [cep, setCep] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [complement, setComplement] = useState("");
    const [cepError, setCepError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Login: ", { name, email, cpf, cep, state, city, street, number, complement });
    };

    const handleCepBlur = async (cep: string) => {
        if (cep) {
            const { state, city, street, error } = await fetchAddressByCep(cep);
            if (error) {
                setCepError(error);
            } else {
                setCepError("");
                setState(state);
                setCity(city);
                setStreet(street);
            }
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-[35%] rounded-lg bg-white p-8 shadow-lg">
                <LogoImage size="h-10" />
                <h1 className="text-2xl font-bold text-gray-800 text-center cursor-default">FlyHigh</h1>
                <div className="flex justify-center items-center cursor-default">
                    <h2 className="text-gray-800">Welcome to Fly</h2>
                    <h2 className="font-bold text-gray-800">High</h2>
                </div>
                <h2 className="mb-4 text-center text-2xl text-gray-800 cursor-default">Self Registration</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <BasicInput type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div className="mb-4">
                        <BasicInput type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="mb-4 flex space-x-2">
                        <MaskedInput
                            type="text"
                            mask="000.000.000-00"
                            value={cpf}
                            placeholder="CPF"
                            onChange={(e) => setCpf(e.target.value)}
                            required
                        />
                        <MaskedInput
                            type="text"
                            mask="00000-000"
                            value={cep}
                            placeholder="CEP"
                            onChange={(e) => setCep(e.target.value)}
                            onBlur={() => handleCepBlur(cep)}
                            required
                        />
                    </div>

                    {cepError && <p className="text-red-500 text-sm mb-4">{cepError}</p>}

                    <div className="mb-4 flex space-x-2">
                        <BasicInput type="text" value={state} placeholder="State" onChange={(e) => setState(e.target.value)} required disabled classNameAdd="bg-[#F4F4F4]" />
                        <BasicInput type="text" value={city} placeholder="City" onChange={(e) => setCity(e.target.value)} required disabled classNameAdd="bg-[#F4F4F4]" />
                    </div>

                    <div className="mb-4 flex space-x-2">
                        <BasicInput type="text" value={street} placeholder="Street" onChange={(e) => setStreet(e.target.value)} required disabled width="w-7/10" classNameAdd="bg-[#F4F4F4]" />
                        <BasicInput type="text" value={number} placeholder="Number" onChange={(e) => setNumber(e.target.value)} required width="w-3/10" />
                    </div>

                    <div className="mb-4">
                        <BasicInput type="text" value={complement} placeholder="Complement" onChange={(e) => setComplement(e.target.value)} />
                    </div>

                    <SubmitButton text="Register"/>

                    <p className="mt-4 text-center text-sm text-gray-800 cursor-default">
                        Your password will be sent to your email.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SelfRegistration;
