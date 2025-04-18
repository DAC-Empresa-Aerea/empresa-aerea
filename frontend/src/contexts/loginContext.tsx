import React, { createContext, useContext, useState, ReactNode } from "react";
import { loginService } from "../services/loginService";
import Customer from "../types/Customer";
import Employee from "../types/Employee";

// União dos dois tipos possíveis de usuário
type User = Customer | Employee;

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  userType: string | null; // "cliente" ou "funcionario"
  loading: boolean;
  login: (credentials: { login: string; senha: string }) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Hook personalizado para acessar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const login = async ({ login, senha }: { login: string; senha: string }) => {
    setLoading(true);
    try {
      const response = await loginService({ login, senha });

      // Armazena os dados do usuário e seu tipo
      setIsAuthenticated(true);
      setUser(response.usuario as User);
      setUserType(response.tipo); // "cliente" ou "funcionario"
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setUserType(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        userType,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
