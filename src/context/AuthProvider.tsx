import { createContext, useContext, useEffect, useState } from "react";
import { verifyToken } from "../Api/Login";

type AuthContextType = {
  setAuth: any;
  session: any;
  logout: any;
  verifySession: any;
};

type AuthProviderType = {
  children: React.ReactNode;
};

export type AuthData = {
  user: any;
  token: any;
};

export const AuthContext = createContext<AuthContextType>({
  setAuth: null,
  session: null,
} as AuthContextType);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderType) => {
  useEffect(() => {
    const fetchData = async () => {
      const data = getSession();
      if (data) await verifyToken(data.token, logout);
    };
    fetchData();
    setTimeout(() => logout(), 60 * 60 * 1000);
  }, []);

  const getSession = (): any => {
    const sessionData = localStorage.getItem("session");
    if (sessionData) return JSON.parse(sessionData);
    else return null;
  };

  const setSessionInLocalStorage = (token: string) => {
    localStorage.setItem("session", JSON.stringify(token));
    return true;
  };

  const auth = getSession();

  const [session, setSession] = useState(auth || "");

  const setAuth = (token: any) => {
    setSession(token);
    setSessionInLocalStorage(token);
  };

  const verifySession = async () => {
    await verifyToken(session.token, logout);
  };

  const logout = () => {
    console.log("logging out");
    setSession("");
    localStorage.removeItem("session");
  };

  return (
    <AuthContext.Provider value={{ session, setAuth, logout, verifySession }}>
      {children}
    </AuthContext.Provider>
  );
};
