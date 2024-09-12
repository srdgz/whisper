import React from "react";
import LottieView from "lottie-react-native";
import { View, ViewStyle, StyleSheet } from "react-native";
import { LoadingProps } from "../constants/types";

const Loading: React.FC<LoadingProps> = ({ size }) => {
  const containerStyle: ViewStyle = {
    height: size,
    aspectRatio: 1,
  };

  return (
    <View style={containerStyle}>
      <LottieView
        style={styles.lottieView}
        source={require("../../assets/lottie/lottie-loader.json")}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  lottieView: {
    flex: 1,
  },
});

export default Loading;
