import React, { useState } from "react";
import ChatRoomHeader from "../components/ChatRoomHeader";
import MessagesList from "../components/MessagesList";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import CustomKeyboardView from "../components/CustomKeyboardView";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, TextInput, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const ChatRoom: React.FC = () => {
  const { item } = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState([]);

  const chatItem = typeof item === "string" ? JSON.parse(item) : null;

  return (
    <CustomKeyboardView inChat={true}>
      <View className="flex-1 bg-white">
        <StatusBar style="dark" />
        <ChatRoomHeader user={chatItem} router={router} />
        <View className="h-3 border-b border-teal-400" />
        <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
          <View className="flex-1">
            <MessagesList messages={messages} />
          </View>
          <View style={{ marginBottom: hp(2.7) }} className="pt-2">
            <View className="flex-row mx-3 justify-between bg-white border border-sky-200 rounded-full p-2 pl-5">
              <TextInput
                placeholder="Escribe tu mensaje..."
                className="flex-1 mr-2"
                style={{ fontSize: hp(2) }}
              />
              <TouchableOpacity className="bg-sky-100 p-2 mr-[1px] rounded-full">
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
