import { ReactNode } from "react";

export interface LoadingProps {
  size: number;
}

export interface User {
  id: string;
  email: string;
  username: string;
  profileUrl: string;
}

export interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    email: string,
    password: string,
    username: string,
    profileUrl: string
  ) => Promise<void>;
}

export interface AuthContextProviderProps {
  children: ReactNode;
}

export interface CustomKeyboardViewProps {
  children: ReactNode;
}
