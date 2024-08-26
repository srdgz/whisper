import { useGlobalSearchParams } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

const ChatRoom: React.FC = () => {
  const { id } = useGlobalSearchParams();

  return (
    <View>
      <Text>Chat Room for user Id: {id}</Text>
      {/* Renderizar el chat room basado en el item */}
    </View>
  );
};

export default ChatRoom;
