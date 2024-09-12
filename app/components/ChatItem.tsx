import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Alert, StyleSheet } from "react-native";
import { ChatItemProps, Message } from "../constants/types";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Image } from "expo-image";
import { blurhash, getRoomId } from "../constants/common";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { Swipeable } from "react-native-gesture-handler";

const defaultProfileImage = "https://i.ibb.co/rk0SghB/user.png";

const ChatItem: React.FC<ChatItemProps> = ({
  item,
  index,
  router,
  noBorder,
  currentUser,
  onDelete,
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
    if (currentUser?.userId === lastMessage.userId)
      return `Tú: ${lastMessage.text}`;
    return lastMessage.text;
  };

  const deleteChat = async () => {
    try {
      if (currentUser?.userId && item?.userId) {
        const roomId = getRoomId(currentUser.userId, item.userId);
        const messagesRef = collection(db, "rooms", roomId, "messages");
        const querySnapshot = await getDocs(messagesRef);
        const deletePromises = querySnapshot.docs.map((messageDoc) =>
          deleteDoc(doc(db, "rooms", roomId, "messages", messageDoc.id))
        );
        await Promise.all(deletePromises);
        await deleteDoc(doc(db, "rooms", roomId));
        await deleteDoc(doc(db, "chats", roomId));
        onDelete(item.userId);
        Alert.alert("Eliminado", "El chat ha sido eliminado");
      }
    } catch (error) {
      console.error("Error al eliminar el chat: ", error);
      Alert.alert("Error", "No se pudo eliminar el chat. Inténtalo de nuevo.");
    }
  };

  const renderDeleteButton = () => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          Alert.alert(
            "Eliminar Chat",
            "¿Estás seguro de que deseas eliminar este chat?",
            [
              {
                text: "Cancelar",
                style: "cancel",
              },
              {
                text: "Eliminar",
                style: "destructive",
                onPress: deleteChat,
              },
            ]
          );
        }}
      >
        <Text style={styles.textDeleteButton}>Eliminar</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (currentUser?.userId && item?.userId) {
      let roomId = getRoomId(currentUser.userId, item.userId);
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");
      const q = query(messagesRef, orderBy("createdAt", "desc"));
      const unsub = onSnapshot(q, (snapshot) => {
        const allMessages = snapshot.docs.map((doc) => doc.data() as Message);
        setLastMessage(allMessages[0] ? allMessages[0] : null);
      });
      return () => unsub();
    }
  }, [currentUser?.userId, item?.userId]);

  return (
    <Swipeable renderRightActions={renderDeleteButton}>
      <TouchableOpacity
        className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${
          noBorder ? "" : "border-b border-b-neutral-200"
        }`}
        onPress={openChatRoom}
      >
        <Image
          style={styles.image}
          source={
            item?.profileImage
              ? { uri: item.profileImage }
              : defaultProfileImage
          }
          placeholder={blurhash}
          transition={500}
        />
        <View className="flex-1 gap-1">
          <View className="flex-row justify-between">
            <Text
              style={styles.textUsername}
              className="font-semibold text-neutral-700"
            >
              {item?.username}
            </Text>
            <Text
              style={styles.textMessage}
              className="font-medium text-neutral-500"
            >
              {renderTime()}
            </Text>
          </View>
          <Text
            style={styles.textMessage}
            className="font-medium text-neutral-500"
          >
            {renderLastMessage()}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  image: {
    height: hp(6),
    width: hp(6),
    borderRadius: 100,
  },
  textUsername: {
    fontSize: hp(1.8),
  },
  textMessage: {
    fontSize: hp(1.6),
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 55,
  },
  textDeleteButton: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ChatItem;
