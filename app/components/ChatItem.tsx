import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { ChatItemProps } from "../constants/types";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useAuth } from "../context/authContext";
import { Image } from "expo-image";
import { blurhash } from "../constants/common";

const defaultProfileImage = require("../../assets/images/user.png");

const ChatItem: React.FC<ChatItemProps> = ({
  item,
  index,
  router,
  noBorder,
}) => {
  const { user } = useAuth();
  const profileImage = user?.profileImage
    ? { uri: user.profileImage }
    : defaultProfileImage;

  const openChatRoom = () => {
    router.push({
      pathname: "/chatRoom",
      params: { id: item.id },
    });
  };

  return (
    <TouchableOpacity
      className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${
        noBorder ? "" : "border-b border-b-neutral-200"
      }`}
      onPress={openChatRoom}
    >
      <Image
        style={{ height: hp(6), width: hp(6), borderRadius: 100 }}
        source={profileImage}
        placeholder={blurhash}
        transition={500}
      />
      <View className="flex-1 gap-1">
        <View className="flex-row justify-between">
          <Text
            style={{ fontSize: hp(1.8) }}
            className="font-semibold text-neutral-700"
          >
            {item?.username}
          </Text>
          <Text
            style={{ fontSize: hp(1.6) }}
            className="font-medium text-neutral-500"
          >
            Hora
          </Text>
        </View>
        <Text
          style={{ fontSize: hp(1.6) }}
          className="font-medium text-neutral-500"
        >
          Último mensaje
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
