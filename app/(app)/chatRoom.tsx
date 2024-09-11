import React, { useEffect, useRef, useState } from "react";
import ChatRoomHeader from "../components/ChatRoomHeader";
import MessagesList from "../components/MessagesList";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import CustomKeyboardView from "../components/CustomKeyboardView";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Keyboard,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useAuth } from "../context/authContext";
import { getRoomId } from "../constants/common";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { Message } from "../constants/types";

const ChatRoom: React.FC = () => {
  const { item } = useLocalSearchParams();
  const { user } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const textRef = useRef<string>("");
  const inputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const chatItem = typeof item === "string" ? JSON.parse(item) : null;

  const createRoomIfNotExists = async () => {
    if (user?.userId && chatItem?.userId) {
      let roomId = getRoomId(user.userId, chatItem.userId);
      await setDoc(doc(db, "rooms", roomId), {
        roomId,
        createdAt: Timestamp.fromDate(new Date()),
        users: [user.userId, chatItem.userId],
      });
    } else {
      console.error("Error creating chat");
    }
  };

  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) return;
    if (user?.userId && chatItem?.userId) {
      try {
        let roomId = getRoomId(user.userId, chatItem.userId);
        const docRef = doc(db, "rooms", roomId);
        const messagesRef = collection(docRef, "messages");
        textRef.current = "";
        if (inputRef.current) {
          inputRef.current.clear();
        }
        const newDoc = await addDoc(messagesRef, {
          userId: user.userId,
          text: message,
          senderName: user.username,
          createdAt: Timestamp.fromDate(new Date()),
        });
        updateScrollView();
      } catch (error) {
        console.error(error);
        Alert.alert(
          "Error",
          "El mensaje no se ha podido enviar. Inténtalo de nuevo."
        );
      }
    } else {
      console.error("User ID or Chat Item ID is undefined");
    }
  };

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    updateScrollView();
  }, [messages]);

  useEffect(() => {
    if (user?.userId && chatItem?.userId) {
      createRoomIfNotExists();
      let roomId = getRoomId(user.userId, chatItem.userId);
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");
      const q = query(messagesRef, orderBy("createdAt", "asc"));
      const unsub = onSnapshot(q, (snapshot) => {
        const allMessages = snapshot.docs.map((doc) => doc.data() as Message);
        setMessages(allMessages);
      });
      const keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        updateScrollView
      );
      return () => {
        unsub();
        keyboardDidShowListener.remove();
      };
    }
  }, [user?.userId, chatItem?.userId]);

  return (
    <CustomKeyboardView inChat={true}>
      <View className="flex-1 bg-white">
        <StatusBar style="dark" />
        <ChatRoomHeader user={chatItem} router={router} />
        <View className="h-3 border-b border-teal-400" />
        <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
          <View className="flex-1 ">
            <MessagesList
              scrollViewRef={scrollViewRef}
              messages={messages}
              currentUser={user}
            />
          </View>
          <View style={{ marginBottom: hp(2.7) }} className="pt-2">
            <View className="flex-row mx-3 justify-between bg-white border border-sky-200 rounded-full p-2 pl-5">
              <TextInput
                onChangeText={(value) => (textRef.current = value)}
                ref={inputRef}
                placeholder="Escribe tu mensaje..."
                className="flex-1 mr-2"
                style={{ fontSize: hp(2) }}
              />
              <TouchableOpacity
                onPress={handleSendMessage}
                className="bg-sky-100 p-2 mr-[1px] rounded-full"
              >
                <FontAwesome name="send-o" size={hp(2.7)} color="#003366" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default ChatRoom;
