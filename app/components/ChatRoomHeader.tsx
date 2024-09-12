import React, { useState } from "react";
import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import ChatModal from "./ChatModal";
import { Stack } from "expo-router";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ChatRoomProps } from "../constants/types";
import { Image } from "expo-image";
import { blurhash } from "../constants/common";

const ChatRoomHeader: React.FC<ChatRoomProps> = ({ user, router }) => {
  const [modalChatVisible, setModalChatVisible] = useState(false);

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
    <>
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
                    style={styles.image}
                    placeholder={blurhash}
                    transition={500}
                    cachePolicy="disk"
                  />
                )}
                <Text
                  style={styles.text}
                  className="text-neutral-600 font-medium"
                >
                  {user?.username}
                </Text>
              </View>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => setModalChatVisible(true)}>
              <View className="flex-row items-center">
                <FontAwesome5 name="user-cog" size={hp(2.8)} color="#4DB6AC" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <ChatModal
        visible={modalChatVisible}
        onClose={() => setModalChatVisible(false)}
        user={user}
      />
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    height: hp(4.5),
    aspectRatio: 1,
    borderRadius: 100,
    marginLeft: 10,
  },
  text: {
    fontSize: hp(2.5),
  },
});

export default ChatRoomHeader;
