import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Login: ", {email, password});
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            {/* Container */}
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
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
                <h2 className="mb-4 text-center text-2xl text-gray-800 cursor-default">Login</h2>

                {/* Form */}
                <form onSubmit={handleSubmit}>

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

                    {/* Campo de Senha */}
                    <div className="mb-4">
                        <input
                            type="password"
                            className="mt-1 w-full rounded-md border px-3 py-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Opcoes entre os inputs e o botao de login */}
                    <div className="mb-4 flex items-center justify-between">
                        <label className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300"/>
                            <span className="ml-2 text-sm text-gray-600">Keep me signed in</span>
                        </label>
                        <a href="#" className="text-sm text-blue-500">Forgot Password?</a>
                    </div>

                    {/* Botao de Login */}
                    <button
                        type="submit"
                        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 cursor-pointer"
                    >
                        Login
                    </button>

                    {/* Link para a pagina de cadastro*/}
                    <p className="mt-4 text-center text-sm text-gray-600 cursor-default">
                        Don't have an account? <a href="#" className="text-blue-500 hover:underline">Register</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;