import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { login, logout } from '../services/authService';
import { LoginRequest } from '../types/api/login';

interface AuthContextType {
  isAuthenticated: boolean;
  userType: string | null;
  userData: any | null;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Check for existing auth on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUserType = localStorage.getItem('userType');
    const storedUserData = localStorage.getItem('userData');
    
    if (token && storedUserType && storedUserData) {
      setIsAuthenticated(true);
      setUserType(storedUserType);
      setUserData(JSON.parse(storedUserData));
    }
    
    setLoading(false);
  }, []);
  
  const handleLogin = async (credentials: LoginRequest) => {
    try {
      setLoading(true);
      const response = await login(credentials);
      
      // Store auth data
      localStorage.setItem('authToken', response.access_token);
      localStorage.setItem('userType', response.tipo);
      localStorage.setItem('userData', JSON.stringify(response.usuario));
      
      setIsAuthenticated(true);
      setUserType(response.tipo);
      setUserData(response.usuario);
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    setUserType(null);
    setUserData(null);
  };
  
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userType,
        userData,
        login: handleLogin,
        logout: handleLogout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};