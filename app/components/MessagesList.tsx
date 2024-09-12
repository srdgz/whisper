import React from "react";
import MessageItem from "./MessageItem";
import { ScrollView, StyleSheet } from "react-native";
import { MessagesListProps } from "../constants/types";

const MessagesList: React.FC<MessagesListProps> = ({
  messages,
  currentUser,
  scrollViewRef,
}) => {
  return (
    <ScrollView
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
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

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
});

export default MessagesList;
