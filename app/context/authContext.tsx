import React, { useContext, useEffect, useState, createContext } from "react";
import {
  User,
  AuthContextProps,
  AuthContextProviderProps,
} from "../constants/types";

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    setIsAuthenticated(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Lógica para iniciar sesión
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      // Lógica para cerrar sesión
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (
    email: string,
    password: string,
    username: string,
    profileUrl: string
  ) => {
    try {
      // Lógica para registrar un nuevo usuario
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be wrapped inside AuthContextProvider");
  }
  return context;
};
