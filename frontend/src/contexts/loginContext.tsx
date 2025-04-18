import React, { createContext, useContext, useState, ReactNode } from "react";
import { loginService } from "../services/loginService";

interface AuthContextType {
  isAuthenticated: boolean;
  userType: string | null;
  loading: boolean;
  login: (credentials: { login: string; senha: string }) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const login = async ({ login, senha }: { login: string; senha: string }) => {
    setLoading(true);
    try {
      const response = await loginService({ login, senha });
      setIsAuthenticated(true);
      setUserType(response.tipo); // Armazenando tipo de usuário
      setLoading(false);
      return response; // Retorna o objeto com tipo e usuário
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
