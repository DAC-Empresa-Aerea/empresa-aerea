import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoImage from "../../components/atoms/images/LogoImage";
import BasicInput from "../../components/atoms/inputs/BasicInput";
import MaskedInput from "../../components/atoms/inputs/MaskedInput";
import { fetchAddressByCep } from "../../utils/ViaCep";
import SubmitButton from "../../components/atoms/buttons/SubmitButton";
//import { register } from "../../services/authService";
import { useCreateCustomer } from "../../hooks/customers/useCreateCustomer";

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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { mutateAsync: registerCustomer } = useCreateCustomer();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await registerCustomer({
        cpf,
        email,
        nome: name,
        saldo_milhas: 0,
        endereco: {
          cep,
          uf: state,
          cidade: city,
          rua: street,
          numero: number,
          complemento: complement,
          bairro: ""
        }
      });

      setSuccess("Cadastro realizado com sucesso! Uma senha será enviada por e-mail.");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err: any) {
      console.error(err);
      const errorMessage =
        err?.response?.data?.erro ||
        (err instanceof Error ? err.message : "Erro ao registrar. Tente novamente.");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
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
        <h1 className="text-2xl font-bold text-gray-800 text-center cursor-default">
          FlyHigh
        </h1>
        <div className="flex justify-center items-center cursor-default">
          <h2 className="text-gray-800">Bem-vindo ao Fly</h2>
          <h2 className="font-bold text-gray-800">High</h2>
        </div>
        <h2 className="mb-4 text-center text-2xl text-gray-800 cursor-default">
          Auto cadastro
        </h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-400 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-2 bg-green-100 text-green-700 border border-green-400 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <BasicInput
              type="text"
              value={name}
              placeholder="Nome"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <BasicInput
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
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
            <BasicInput
              type="text"
              value={state}
              placeholder="Estado"
              onChange={(e) => setState(e.target.value)}
              required
              disabled
              classNameAdd="bg-[#F4F4F4]"
            />
            <BasicInput
              type="text"
              value={city}
              placeholder="Cidade"
              onChange={(e) => setCity(e.target.value)}
              required
              disabled
              classNameAdd="bg-[#F4F4F4]"
            />
          </div>

          <div className="mb-4 flex space-x-2">
            <BasicInput
              type="text"
              value={street}
              placeholder="Rua"
              onChange={(e) => setStreet(e.target.value)}
              required
              disabled
              width="w-7/10"
              classNameAdd="bg-[#F4F4F4]"
            />
            <BasicInput
              type="text"
              value={number}
              placeholder="Número"
              onChange={(e) => setNumber(e.target.value)}
              required
              width="w-3/10"
            />
          </div>

          <div className="mb-4">
            <BasicInput
              type="text"
              value={complement}
              placeholder="Complemento"
              onChange={(e) => setComplement(e.target.value)}
            />
          </div>

          <SubmitButton text={loading ? "Registrando..." : "Enviar"} />

          <p className="mt-4 text-center text-sm text-gray-800 cursor-default">
            Sua senha será enviada para o seu e-mail.
          </p>

          <p className="mt-2 text-center text-sm text-gray-600 cursor-default">
            Já tem uma conta?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SelfRegistration;
