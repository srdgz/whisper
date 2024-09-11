import { Router } from "expo-router";
import { Timestamp } from "firebase/firestore";
import { ReactNode, RefObject } from "react";
import { ImageStyle, ScrollView, StyleProp } from "react-native";

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
  userId: string;
  email: string;
  username: string;
  profileImage: string;
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
  updateUserProfile: (updatedUser: Partial<User>) => Promise<void>;
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
  currentUser: User | null;
}

export interface ChatItemProps {
  item: User;
  index: number;
  noBorder: boolean;
  router: Router;
  currentUser: User | null;
  onDelete: (userId: string) => void;
}

export interface ChatRoomProps {
  user: User;
  router: Router;
}

export interface Message {
  id: string;
  text: string;
  userId: string;
  senderName: string;
  createdAt: Timestamp;
}

export interface MessagesListProps {
  messages: any[];
  currentUser: User | null;
  scrollViewRef: RefObject<ScrollView>;
}

export interface MessageItemProps {
  message: any;
  currentUser: User | null;
}

export interface SearchUserModalProps {
  visible: boolean;
  email: string;
  setEmail: (email: string) => void;
  isLoading: boolean;
  onSearch: (email: string) => void;
  onClose: () => void;
}
