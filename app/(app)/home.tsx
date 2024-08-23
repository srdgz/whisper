import React from "react";
import { View, Text, Pressable } from "react-native";
import { useAuth } from "../context/authContext";

const Home: React.FC = () => {
  const { logout, user } = useAuth();
  const handleLogout = async () => {
    await logout();
  };

  return (
    <View>
      <Text>Home</Text>
      <Pressable onPress={handleLogout}>
        <Text>Cerrar sesión</Text>
      </Pressable>
    </View>
  );
};

export default Home;
