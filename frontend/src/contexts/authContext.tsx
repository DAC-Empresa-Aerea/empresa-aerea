import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  login as loginService,
  logout as logoutService,
} from "../services/authService";
import { LoginRequest, LoginResponse } from "../types/api/login";

interface AuthContextType {
  isAuthenticated: boolean;
  userType: string | null;
  userData: any | null;
  login: (credentials: LoginRequest) => Promise<LoginResponse>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUserType = localStorage.getItem("userType");
    const storedUserData = localStorage.getItem("userData");

    if (token && storedUserType && storedUserData) {
      try {
        setIsAuthenticated(true);
        setUserType(storedUserType);
        setUserData(JSON.parse(storedUserData));
      } catch (error) {
        console.error("Error:", error);
        logoutService();
      }
    }

    setLoading(false);
  }, []);

  const handleLogin = async (
    credentials: LoginRequest
  ): Promise<LoginResponse> => {
    try {
      setLoading(true);
      const response = await loginService(credentials);

      localStorage.setItem("authToken", response.access_token);
      localStorage.setItem("userType", response.tipo);
      localStorage.setItem("userData", JSON.stringify(response.usuario));

      setIsAuthenticated(true);
      setUserType(response.tipo);
      setUserData(response.usuario);

      return response; 
    } catch (error) {
      console.error("Login error:", error);
      throw error; 
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logoutService();
    setIsAuthenticated(false);
    setUserType(null);
    setUserData(null);
  };

  const contextValue: AuthContextType = {
    isAuthenticated,
    userType,
    userData,
    login: handleLogin,
    logout: handleLogout,
    loading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth error");
  }
  return context;
};
