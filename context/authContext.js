import { useContext, useEffect, useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    // setTimeout(() => {
    setIsAuthenticated(false);
    // }, 3000);
  }, []);

  const login = async (email, password) => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (email, password, username, profileUrl) => {
    try {
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
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be wrapped inside AuthContextProvider");
  }
  return value;
};
