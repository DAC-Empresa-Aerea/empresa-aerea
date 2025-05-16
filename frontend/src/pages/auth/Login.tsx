// Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/loginContext";
import LogoImage from "../../components/atoms/images/LogoImage";
import BasicInput from "../../components/atoms/inputs/BasicInput";
import SubmitButton from "../../components/atoms/buttons/SubmitButton";
import {
  CustomerRoutesEnum,
  EmployeeRoutesEnum,
} from "../../routes/routes.enum";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const hasMinLength = password.length >= 4;
    const hasNumber = /[0-9]/.test(password);

    return {
      isValid:
        hasMinLength &&
        hasNumber,
      requirements: {
        hasMinLength,
        hasNumber,
      },
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEmailError("");
    setPasswordError("");
    setIsLoading(true);

    if (!validateEmail(email)) {
      setEmailError("Por favor, insira um email válido");
      setIsLoading(false);
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      const requirements = passwordValidation.requirements;
      const missingRequirements = [];

      if (!requirements.hasMinLength)
        missingRequirements.push("4 caracteres");
      if (!requirements.hasNumber) missingRequirements.push("um número");

      setPasswordError(
        `A senha deve conter: ${missingRequirements.join(", ")}`
      );
      setIsLoading(false);
      return;
    }

    try {
      const response = await signIn(email, password);

      if (response.tipo === "CLIENTE") {
        navigate(`/${CustomerRoutesEnum.BASE}/${CustomerRoutesEnum.HOME}`);
      } else if (response.tipo === "FUNCIONARIO") {
        navigate(`/${EmployeeRoutesEnum.BASE}/${EmployeeRoutesEnum.HOME}`);
      } else {
        navigate("/");
      }
    } catch (err) {
      let errorMessage =
        "Falha no login. Por favor, verifique suas credenciais.";

      if (err instanceof Error) {
        if (err.message.includes("Usuário ou senha inválidos")) {
          errorMessage =
            "Email ou senha incorretos. Por favor, tente novamente.";
        } else if (err.message.includes("Erro na requisição de login")) {
          errorMessage =
            "Erro ao conectar com o servidor. Por favor, tente novamente mais tarde.";
        }
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      {/* Container */}
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <LogoImage size="h-10" />
        <h1 className="text-2xl font-bold text-gray-800 text-center cursor-default">
          FlyHigh
        </h1>
        <div className="flex justify-center items-center cursor-default">
          <h2 className="text-gray-800">Bem vindo ao Fly</h2>
          <h2 className="font-bold text-gray-800">High</h2>
        </div>
        <h2 className="mb-4 text-center text-2xl text-gray-800 cursor-default">
          Login
        </h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-400 rounded">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <div className="mb-4">
            <BasicInput
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              required
              classNameAdd={emailError ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          {/* Password field */}
          <div className="mb-4">
            <BasicInput
              type="password"
              value={password}
              placeholder="Senha"
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              required
              classNameAdd={passwordError ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          {/* Login button */}
          <SubmitButton
            text={isLoading ? "Entrando..." : "Entrar"}
            disabled={isLoading}
          />

          {/* Registration link */}
          <p className="mt-4 text-center text-sm text-gray-600 cursor-default">
            Não tem uma conta?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Registre-se
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
