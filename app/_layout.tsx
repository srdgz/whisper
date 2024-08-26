import React, { useEffect } from "react";
import { Slot, useSegments, useRouter } from "expo-router";
import { useAuth, AuthContextProvider } from "./context/authContext";
import { MenuProvider } from "react-native-popup-menu";
import "../global.css";

const MainLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (typeof isAuthenticated === "undefined") return;
    const isAuthRoute = segments[0] === "(auth)";
    if (isAuthenticated && isAuthRoute) {
      router.replace("/home");
    } else if (isAuthenticated === false && !isAuthRoute) {
      router.replace("/signIn");
    }
  }, [isAuthenticated, segments]);

  return <Slot />;
};

const RootLayout = () => {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <MainLayout />
      </AuthContextProvider>
    </MenuProvider>
  );
};

export default RootLayout;
