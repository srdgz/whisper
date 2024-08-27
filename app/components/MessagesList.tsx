import React from "react";
import MessageItem from "./MessageItem";
import { ScrollView } from "react-native";
import { MessagesListProps } from "../constants/types";

const MessagesList: React.FC<MessagesListProps> = ({
  messages,
  currentUser,
}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 10 }}
    >
      {messages.map((message, index) => {
        return (
          <MessageItem
            message={message}
            key={index}
            currentUser={currentUser}
          />
        );
      })}
    </ScrollView>
  );
};

export default MessagesList;
