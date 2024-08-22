import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

const StartPage = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#4DB6AC" />
    </View>
  );
};

export default StartPage;
