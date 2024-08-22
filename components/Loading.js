import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";

const Loading = ({ size }) => {
  return (
    <View style={{ height: size, aspectRatio: 1 }}>
      <LottieView
        style={{ flex: 1 }}
        source={require("../assets/lottie/lottie-loader.json")}
        autoPlay
        loop
      />
    </View>
  );
};

export default Loading;
