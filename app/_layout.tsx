import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Slot, useSegments, useRouter } from "expo-router";
import { useAuth, AuthContextProvider } from "./context/authContext";
import { MenuProvider } from "react-native-popup-menu";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";

const MainLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (typeof isAuthenticated === "undefined") return;
    const inApp = segments[0] === "(app)";
    if (isAuthenticated && !inApp) {
      router.replace("/home");
    } else if (isAuthenticated === false) {
      router.replace("/signIn");
    }
  }, [isAuthenticated]);

  return <Slot />;
};

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={styles.rootView}>
      <MenuProvider>
        <AuthContextProvider>
          <MainLayout />
        </AuthContextProvider>
      </MenuProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
});

export default RootLayout;
