import { useState } from "react";

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Login: ", { name, email, cpf, cep, state, city, street, number, complement });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            {/* Container */}
            <div className="w-full max-w-[35%] rounded-lg bg-white p-8 shadow-lg">
                <img
                    src="/icon/favicon/favicon.ico"
                    alt="Logo"
                    className="mx-auto h-10 mb-2"
                />
                <h1 className="text-2xl font-bold text-gray-800 text-center cursor-default">FlyHigh</h1>
                <div className="flex justify-center items-center cursor-default">
                    <h2 className="text-gray-800">Welcome to Fly</h2>
                    <h2 className="font-bold text-gray-800">High</h2>
                </div>
                <h2 className="mb-4 text-center text-2xl text-gray-800 cursor-default">Self Registration</h2>

                {/* Form */}
                <form onSubmit={handleSubmit}>

                    {/* Campo de Nome */}
                    <div className="mb-4">
                        <input
                            type="text"
                            className="mt-1 w-full rounded-md border px-3 py-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={name}
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Campo de Email */}
                    <div className="mb-4">
                        <input
                            type="email"
                            className="mt-1 w-full rounded-md border px-3 py-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={email}
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Campos de CPF e CEP */}
                    <div className="mb-4 flex space-x-2">
                        <input
                            type="text"
                            className="mt-1 w-full rounded-md border px-3 py-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={cpf}
                            placeholder="CPF"
                            onChange={(e) => setCpf(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            className="mt-1 w-full rounded-md border px-3 py-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={cep}
                            placeholder="CEP"
                            onChange={(e) => setCep(e.target.value)}
                            required
                        />
                    </div>

                    {/* Campos de Estado e Cidade */}
                    <div className="mb-4 flex space-x-2">
                        <input
                            type="text"
                            className="mt-1 w-full rounded-md border px-3 py-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-[#F4F4F4]"
                            value={state}
                            placeholder="State"
                            onChange={(e) => setState(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            className="mt-1 w-full rounded-md border px-3 py-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-[#F4F4F4]"
                            value={city}
                            placeholder="City"
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>

                    {/* Campos de Rua e Numero */}
                    <div className="mb-4 flex space-x-2">
                        <input
                            type="text"
                            className="mt-1 w-7/10 rounded-md border px-3 py-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-[#F4F4F4]"
                            value={street}
                            placeholder="Street"
                            onChange={(e) => setStreet(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            className="mt-1 w-3/10 rounded-md border px-3 py-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={number}
                            placeholder="Number"
                            onChange={(e) => setNumber(e.target.value)}
                            required
                        />
                    </div>
                    {/* Campo de Complemento */}
                    <div className="mb-4">
                        <input
                            type="text"
                            className="mt-1 w-full rounded-md border px-3 py-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={complement}
                            placeholder="Complement"
                            onChange={(e) => setComplement(e.target.value)}
                            required
                        />
                    </div>

                    {/* Botao de Registro */}
                    <button
                        type="submit"
                        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 cursor-pointer"
                    >
                        Register
                    </button>

                    {/* Texto apoio senha envio e-mail*/}
                    <p className="mt-4 text-center text-sm text-gray-800 cursor-default">
                        Your password will be sent to your email.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SelfRegistration;