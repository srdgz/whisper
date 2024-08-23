import React from "react";
import LottieView from "lottie-react-native";
import { View, ViewStyle } from "react-native";
import { LoadingProps } from "../constants/types";

const Loading: React.FC<LoadingProps> = ({ size }) => {
  const containerStyle: ViewStyle = {
    height: size,
    aspectRatio: 1,
  };

  return (
    <View style={containerStyle}>
      <LottieView
        style={{ flex: 1 }}
        source={require("../../assets/lottie/lottie-loader.json")}
        autoPlay
        loop
      />
    </View>
  );
};

export default Loading;
