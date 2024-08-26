import React from "react";
import { Image, ImageStyle, StyleProp } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface BackgroundBlobProps {
  style?: StyleProp<ImageStyle>;
}

const BackgroundBlob: React.FC<BackgroundBlobProps> = ({ style }) => {
  return (
    <Image
      source={require("../../assets/images/blob.png")}
      style={[
        {
          position: "absolute",
          width: wp(250),
          height: wp(250),
          top: hp(0),
          left: wp(-80),
          zIndex: -1,
          resizeMode: "contain",
        },
        style,
      ]}
    />
  );
};

export default BackgroundBlob;
