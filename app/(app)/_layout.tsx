import React from "react";
import { Stack } from "expo-router";
import HomeHeader from "../components/HomeHeader";

const AppLayout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ header: () => <HomeHeader /> }} />
      <Stack.Screen
        name="chatRoom"
        options={{ header: () => <HomeHeader /> }}
      />
    </Stack>
  );
};

export default AppLayout;
