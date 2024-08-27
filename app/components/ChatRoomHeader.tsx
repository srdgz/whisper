import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import { Stack } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ChatRoomProps } from "../constants/types";
import { Image } from "expo-image";

const defaultProfileImage = require("../../assets/images/user.png");

const ChatRoomHeader: React.FC<ChatRoomProps> = ({ user, router }) => {
  const profileImage = user?.profileImage
    ? { uri: user.profileImage }
    : defaultProfileImage;

  const handleBack = () => {
    router.back();
  };

  return (
    <Stack.Screen
      options={{
        title: "",
        headerShadowVisible: false,
        headerLeft: () => (
          <View className="flex-row items-center gap-4">
            <TouchableOpacity onPress={handleBack}>
              <Octicons name="chevron-left" size={hp(4)} color="#003366" />
            </TouchableOpacity>
            <View className="flex-row items-center gap-3">
              <Image
                source={profileImage}
                style={{
                  height: hp(4.5),
                  aspectRatio: 1,
                  borderRadius: 100,
                  marginLeft: 10,
                }}
              />
              <Text
                style={{ fontSize: hp(2.5) }}
                className="text-neutral-600 font-medium"
              >
                {user?.username}
              </Text>
            </View>
          </View>
        ),
        headerRight: () => (
          <View className="flex-row items-center gap-8">
            <Ionicons name="videocam-outline" size={hp(2.8)} color="#003366" />
            <Ionicons name="call-outline" size={hp(2.8)} color="#003366" />
          </View>
        ),
      }}
    />
  );
};

export default ChatRoomHeader;
