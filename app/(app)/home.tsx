import React, { useEffect, useState } from "react";
import ChatList from "../components/ChatList";
import Loading from "../components/Loading";
import Octicons from "@expo/vector-icons/Octicons";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, View, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { User } from "../constants/types";
import { useAuth } from "../context/authContext";
import { usersRef } from "../lib/firebase";
import { getDocs, query, where } from "firebase/firestore";

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isSearchUserModalVisible, setIsSearchUserModalVisible] =
    useState<boolean>(false);

  const getUsers = async () => {
    if (!user?.id) return;
    const q = query(usersRef, where("userId", "!=", user?.id));
    const querySnapshot = await getDocs(q);
    const data: User[] = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as User)
    );
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, [user]);

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />
      {users.length > 0 ? (
        <ChatList currentUser={user} users={users} />
      ) : (
        <View className="flex items-center" style={{ top: hp(30) }}>
          <Loading size={hp(10)} />
        </View>
      )}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: hp(3),
          right: wp(8),
          zIndex: 10,
        }}
        onPress={() => setIsSearchUserModalVisible(true)}
      >
        <Octicons name="plus-circle" size={hp(7)} color="#4DB6AC" />
      </TouchableOpacity>
    </View>
  );
};

export default Home;
