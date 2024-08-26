import { ReactNode } from "react";

export interface LoadingProps {
  size: number;
}

export interface User {
  id: string;
  email: string;
  username: string;
  profileImage?: string;
}

export interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean | undefined;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; msg?: string }>;
  logout: () => Promise<void>;
  register: (
    email: string,
    password: string,
    username: string
  ) => Promise<{ success: boolean; msg?: string }>;
}

export interface AuthContextProviderProps {
  children: ReactNode;
}

export interface CustomKeyboardViewProps {
  children: ReactNode;
}

export interface MenuItemProps {
  text: string;
  action: (value: any) => void;
  value: any;
  icon?: React.ReactNode;
}
