import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import { Stack } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ChatRoomProps } from "../constants/types";
import { Image } from "expo-image";
import { blurhash } from "../constants/common";

const ChatRoomHeader: React.FC<ChatRoomProps> = ({ user, router }) => {
  const handleBack = () => {
    router.back();
  };

  const getCorrectProfileImageURL = (url: string) => {
    return url.replace("/images/", "/images%2F");
  };

  const profileImageURL = user.profileImage
    ? getCorrectProfileImageURL(user.profileImage)
    : null;

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
              {profileImageURL && (
                <Image
                  source={{ uri: profileImageURL }}
                  style={{
                    height: hp(4.5),
                    aspectRatio: 1,
                    borderRadius: 100,
                    marginLeft: 10,
                  }}
                  placeholder={blurhash}
                  transition={500}
                  cachePolicy="disk"
                />
              )}

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
