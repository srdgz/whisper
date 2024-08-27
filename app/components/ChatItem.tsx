import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { ChatItemProps, Message } from "../constants/types";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Image } from "expo-image";
import { blurhash, getRoomId } from "../constants/common";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../lib/firebase";

const defaultProfileImage = "https://i.ibb.co/rk0SghB/user.png";

const ChatItem: React.FC<ChatItemProps> = ({
  item,
  index,
  router,
  noBorder,
  currentUser,
}) => {
  const [lastMessage, setLastMessage] = useState<Message | null>(null);

  const formatDate = (timestamp: any) => {
    const date = timestamp?.toDate ? timestamp.toDate() : new Date();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const openChatRoom = () => {
    router.push({
      pathname: "/chatRoom",
      params: { item: JSON.stringify(item) },
    });
  };

  const renderTime = () => {
    return lastMessage ? formatDate(lastMessage.createdAt) : "Hora";
  };

  const renderLastMessage = () => {
    if (!lastMessage) return "Cargando...";
    if (currentUser?.id === lastMessage.userId)
      return `Tú: ${lastMessage.text}`;
    return lastMessage.text;
  };

  useEffect(() => {
    if (currentUser?.id && item?.id) {
      let roomId = getRoomId(currentUser.id, item.id);
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");
      const q = query(messagesRef, orderBy("createdAt", "desc"));
      const unsub = onSnapshot(q, (snapshot) => {
        const allMessages = snapshot.docs.map((doc) => doc.data() as Message);
        setLastMessage(allMessages[0] ? allMessages[0] : null);
      });
      return () => unsub();
    }
  }, [currentUser?.id, item?.id]);

  return (
    <TouchableOpacity
      className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${
        noBorder ? "" : "border-b border-b-neutral-200"
      }`}
      onPress={openChatRoom}
    >
      <Image
        style={{ height: hp(6), width: hp(6), borderRadius: 100 }}
        source={
          item?.profileImage ? { uri: item.profileImage } : defaultProfileImage
        }
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
            {renderTime()}
          </Text>
        </View>
        <Text
          style={{ fontSize: hp(1.6) }}
          className="font-medium text-neutral-500"
        >
          {renderLastMessage()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
