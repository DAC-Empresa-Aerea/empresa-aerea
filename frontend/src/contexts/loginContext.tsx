// src/contexts/AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import { queryClient } from "../App";
import { useLogin } from "../hooks/useLogin";
import { useLogout } from "../hooks/useLogout";
import Customer from "../types/Customer";
import Employee from "../types/Employee";

// -------------------------------------------------------------------------
// TYPES
// -------------------------------------------------------------------------
type User = Customer | Employee;

type SignInResult = {
  tipo: "CLIENTE" | "FUNCIONARIO";
  usuario: User;
};
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  signIn: (login: string, senha: string) => Promise<SignInResult>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

// -------------------------------------------------------------------------
// PROVIDER
// -------------------------------------------------------------------------
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  /* --------------------------------------------------------
   *  1) Restaura sessão caso exista cookie/token salvo
   * ------------------------------------------------------*/
  useEffect(() => {
    const token = Cookies.get("token");
    const cachedUser = localStorage.getItem("user");
    if (token && cachedUser) {
      try {
        setUser(JSON.parse(cachedUser));
      } catch {
        /* se falhar parsing, ignora */
      }
    }
    setLoading(false);
  }, []);
  /* --------------------------------------------------------
   *  2) Faz login
   * ------------------------------------------------------*/
  const signIn = async (login: string, senha: string) => {
    setLoading(true);
    try {
      const data = await loginMutation.mutateAsync({ login, senha });
      Cookies.set("token", data.access_token, { sameSite: "strict" });
      localStorage.setItem("user", JSON.stringify(data.usuario));

      setUser(data.usuario as User);

      return {
        tipo: data.tipo,
        usuario: data.usuario,
      };
    } finally {
      setLoading(false);
    }
  };
  /* --------------------------------------------------------
   *  3) Faz logout
   * ------------------------------------------------------*/
  const signOut = async () => {
    setLoading(true);
    try {
      await logoutMutation.mutateAsync({ login: "" });
    } catch {
      console.error("Erro ao fazer logout");
    } finally {
      Cookies.remove("token");
      localStorage.removeItem("user");
      setUser(null);
      queryClient.clear();
      setLoading(false);
    }
  };

  /* --------------------------------------------------------
   *  4) Valor do Context
   * ------------------------------------------------------*/
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        loading,
        signIn,
        signOut,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
