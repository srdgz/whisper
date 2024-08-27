import React from "react";
import HomeHeader from "../components/HomeHeader";
import { Stack } from "expo-router";

const AppLayout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ header: () => <HomeHeader /> }} />
      <Stack.Screen name="chatRoom" />
    </Stack>
  );
};

export default AppLayout;
