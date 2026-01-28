import { createContext, useEffect, useRef, useState } from "react";
import {
  loginRequest,
  logoutRequest,
  registerRequest,
  verifyTokenRequest,
} from "../api/userAuth";
import { User } from "../utils/types";
import Cookies from "js-cookie";
import { check } from "zod";
import { Navigate } from "react-router";

interface AuthContextType {
  user: User[];
  login: (user: User) => void;
  logout: () => void;
  registerUser: (user: User) => void;
  errorMessage: string[];
  loading: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const timeoutId = useRef<number | null>(null);
  const [user, setUser] = useState<User[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (data: User) => {
    try {
      const res = await loginRequest(data);
      console.log(res);
      if (res.status === 201) {
        setUser(res.data);
        setIsAuthenticated(true);
        console.log(user);
      } else {
        console.log(res.data);
        setErrorMessage([res.data[0].message]);
        setIsAuthenticated(false);
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }
        timeoutId.current = setTimeout(() => {
          setErrorMessage([]);
        }, 1500);
      }
    } catch (error: any) {
      throw new Error("Error login user: " + error.message);
    }
  };

  const registerUser = async (data: User) => {
    try {
      const res = await registerRequest(data);
      if (res.status !== 200) {
        setErrorMessage([res.data[0].message]);
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }
        timeoutId.current = setTimeout(() => {
          setErrorMessage([]);
        }, 1500);
      } else {
        setIsAuthenticated(true);
        setUser(res.data);
      }
    } catch (error: any) {
      throw new Error("Register user error: " + error.message);
    }
  };

  const logout = async () => {
    const res = await logoutRequest();
    if (res?.status === 201) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    setLoading(true);

    async function checkValidateToken() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
        console.error("Error validating token");
      }
    }

    checkValidateToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        user,
        errorMessage,
        isAuthenticated,
        loading,
        logout,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
