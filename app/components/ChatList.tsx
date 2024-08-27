import React from "react";
import ChatItem from "./ChatItem";
import { View, FlatList } from "react-native";
import { ChatListProps, User } from "../constants/types";
import { useRouter } from "expo-router";

const ChatList: React.FC<ChatListProps> = ({ users }) => {
  const router = useRouter();

  return (
    <View className="flex-1">
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
        keyExtractor={(item: User) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }: { item: User; index: number }) => (
          <ChatItem
            item={item}
            index={index}
            noBorder={index + 1 == users.length}
            router={router}
          />
        )}
      />
    </View>
  );
};

export default ChatList;
