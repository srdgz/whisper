import React, { useState } from "react";
import ChatItem from "./ChatItem";
import { View, FlatList } from "react-native";
import { ChatListProps, User } from "../constants/types";
import { useRouter } from "expo-router";

const ChatList: React.FC<ChatListProps> = ({
  users: initialUsers,
  currentUser,
}) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const router = useRouter();

  const handleDeleteChat = (userId: string) => {
    const updatedUsers = users.filter((user) => user.userId !== userId);
    setUsers(updatedUsers);
  };

  return (
    <View className="flex-1">
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
        keyExtractor={(item: User) => item.userId.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }: { item: User; index: number }) => (
          <ChatItem
            item={item}
            index={index}
            currentUser={currentUser}
            noBorder={index + 1 === users.length}
            router={router}
            onDelete={handleDeleteChat}
          />
        )}
      />
    </View>
  );
};

export default ChatList;
