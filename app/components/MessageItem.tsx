import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MessageItemProps } from "../constants/types";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const MessageItem: React.FC<MessageItemProps> = ({ message, currentUser }) => {
  if (currentUser?.userId == message?.userId) {
    return (
      <View className="flex-row justify-end mb-3 mr-3">
        <View style={styles.messageView}>
          <View className="flex self-end p-3 rounded-2xl bg-sky-100 border border-neutral-200">
            <Text style={styles.messageText}>{message?.text}</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.messageView} className="ml-3 mb-3">
        <View className="flex self-start p-3 px-4 rounded-2xl bg-white border border-neutral-200">
          <Text style={styles.messageText}>{message?.text}</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  messageView: {
    width: wp(80),
  },
  messageText: {
    fontSize: hp(1.9),
  },
});

export default MessageItem;
