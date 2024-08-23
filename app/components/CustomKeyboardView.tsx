import React from "react";
import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { CustomKeyboardViewProps } from "../constants/types";

const ios = Platform.OS == "ios";

const CustomKeyboardView: React.FC<CustomKeyboardViewProps> = ({
  children,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboardView;
