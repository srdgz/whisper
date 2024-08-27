import { Router } from "expo-router";
import { ReactNode } from "react";
import { ImageStyle, StyleProp } from "react-native";

export interface LoadingProps {
  size: number;
}

export interface CustomKeyboardViewProps {
  children: ReactNode;
  inChat: boolean;
}

export interface BackgroundBlobProps {
  style?: StyleProp<ImageStyle>;
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

export interface MenuItemProps {
  text: string;
  action: (value: any) => void;
  value: any;
  icon?: React.ReactNode;
}

export interface ChatListProps {
  users: User[];
}

export interface ChatItemProps {
  item: User;
  index: number;
  noBorder: boolean;
  router: Router;
}

export interface ChatRoomProps {
  user: User;
  router: Router;
}

export interface MessagesListProps {
  messages: any[];
}
