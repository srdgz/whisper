import React from "react";
import { View, Text } from "react-native";
import { MessagesListProps } from "../constants/types";

const MessagesList: React.FC<MessagesListProps> = ({ messages }) => {
  return (
    <View>
      <Text>MessagesList</Text>
    </View>
  );
};

export default MessagesList;
