import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { loginService } from "../services/loginService";
import Customer from "../types/Customer";
import Employee from "../types/Employee";

// União dos dois tipos possíveis de usuário
type User = Customer | Employee;

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
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
  console.log("Auth context:", context);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // começa como true!

  // Restaura do localStorage quando inicia
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedType = localStorage.getItem("userType");

    if (storedUser && storedType) {
      setUser(JSON.parse(storedUser));
      setUserType(storedType);
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const login = async ({ login, senha }: { login: string; senha: string }) => {
    setLoading(true);
    try {
      const response = await loginService({ login, senha });

      setIsAuthenticated(true);
      setUser(response.usuario as User);
      setUserType(response.tipo);

      // Armazena no localStorage
      localStorage.setItem("user", JSON.stringify(response.usuario));
      localStorage.setItem("userType", response.tipo);

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

    localStorage.removeItem("user");
    localStorage.removeItem("userType");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, userType, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

