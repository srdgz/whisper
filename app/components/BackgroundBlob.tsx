import React from "react";
import { Image, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BackgroundBlobProps } from "../constants/types";

const BackgroundBlob: React.FC<BackgroundBlobProps> = ({ style }) => {
  return (
    <Image
      source={require("../../assets/images/blob.png")}
      style={[styles.imageView, style]}
    />
  );
};

const styles = StyleSheet.create({
  imageView: {
    position: "absolute",
    width: wp(250),
    height: wp(250),
    top: hp(0),
    left: wp(-80),
    zIndex: -1,
    resizeMode: "contain",
  },
});

export default BackgroundBlob;
