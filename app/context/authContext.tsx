import React, { useContext, useEffect, useState, createContext } from "react";
import {
  User,
  AuthContextProps,
  AuthContextProviderProps,
} from "../constants/types";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setIsAuthenticated(true);
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const loggedInUser: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email || "",
            username: userData.username,
          };
          setUser(loggedInUser);
          updateUserData(firebaseUser.uid);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

  const updateUserData = async (userId: string): Promise<void> => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const updatedUser: User = {
        id: data.userId,
        email: data.email || "",
        username: data.username || "",
        profile: data.profile,
      };
      setUser(updatedUser);
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; msg?: string }> => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = response.user;
      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const loggedInUser: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || "",
          username: userData.username,
        };
        setUser(loggedInUser);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return {
          success: false,
          msg: "No se pudo encontrar la información del usuario.",
        };
      }
    } catch (error) {
      let errorMessage = "Algo no ha funcionado. Por favor, inténtalo de nuevo";
      if (error instanceof Error && (error as any).code) {
        switch ((error as any).code) {
          case "auth/user-not-found":
            errorMessage = "No hay ningún usuario registrado con este email";
            break;
          case "auth/wrong-password":
            errorMessage = "Contraseña incorrecta";
            break;
          case "auth/invalid-email":
            errorMessage = "Por favor, introduce un email válido";
            break;
          case "auth/invalid-credential":
            errorMessage = "El email o la contraseña no coinciden";
            break;
          default:
            errorMessage =
              "Algo no ha funcionado. Por favor, inténtalo de nuevo";
        }
      }
      return { success: false, msg: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (
    email: string,
    password: string,
    username: string
  ): Promise<{ success: boolean; msg?: string }> => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = response.user;
      const newUser: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email || "",
        username: username,
      };
      setUser(newUser);
      setIsAuthenticated(true);
      await setDoc(doc(db, "users", firebaseUser.uid), {
        username: newUser.username,
        userId: newUser.id,
      });
      return { success: true };
    } catch (error) {
      let errorMessage;
      if (error instanceof Error && (error as any).code) {
        switch ((error as any).code) {
          case "auth/invalid-email":
            errorMessage = "Por favor, introduce un email válido";
            break;
          case "auth/missing-password":
            errorMessage = "Por favor, introduce una contraseña";
            break;
          case "auth/weak-password":
            errorMessage = "La contraseña debe tener al menos 6 caracteres";
            break;
          case "auth/email-already-in-use":
            errorMessage =
              "Este email ya está registrado. Por favor, prueba con otro";
            break;
          default:
            errorMessage =
              "Algo no ha funcionado. Por favor, inténtalo de nuevo";
        }
      }
      return { success: false, msg: errorMessage };
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
