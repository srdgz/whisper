import { View, Text } from "react-native";
import { Slot } from "expo-router";
import React from "react";
import "../global.css";

const _layout = () => {
  return (
    <View>
      <Slot />
    </View>
  );
};

export default _layout;
