import React from "react";
import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { CustomKeyboardViewProps } from "../constants/types";

const ios = Platform.OS == "ios";

const CustomKeyboardView: React.FC<CustomKeyboardViewProps> = ({
  children,
  inChat,
}) => {
  let kavConfig = {};
  let scrollViewConfig = {};
  if (inChat) {
    kavConfig = { keyboardVerticalOffset: 90 };
    scrollViewConfig = { contentContainerStyle: { flex: 1 } };
  }

  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : "height"}
      {...kavConfig}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        {...scrollViewConfig}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboardView;
