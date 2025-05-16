import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { loginService } from "../services/loginService";
import Customer from "../types/Customer";
import Employee from "../types/Employee";

type User = Customer | Employee;

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | Customer | Employee | null;
  setUser: (user: User | null) => void;
  userType: string | null;
  loading: boolean;
  login: (credentials: {
    login: string;
    senha: string;
  }) => Promise<{
    tipo: string;
    usuario: User;
    access_token: string;
    token_type: "bearer";
  }>;
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
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

      localStorage.setItem("user", JSON.stringify(response.usuario));
      localStorage.setItem("userType", response.tipo);
      if (response.access_token) {
        localStorage.setItem("access_token", response.access_token);
      }

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
      value={{
        isAuthenticated,
        user,
        setUser,
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
