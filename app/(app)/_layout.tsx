import React from "react";
import { Stack } from "expo-router";
import HomeHeader from "../components/HomeHeader";

const Layout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ header: () => <HomeHeader /> }} />
    </Stack>
  );
};

export default Layout;
