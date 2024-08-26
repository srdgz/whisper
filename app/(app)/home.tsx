import React, { useEffect, useState } from "react";
import ChatList from "../components/ChatList";
import Loading from "../components/Loading";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
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
        <ChatList users={users} />
      ) : (
        <View className="flex items-center" style={{ top: hp(30) }}>
          <Loading size={hp(10)} />
        </View>
      )}
    </View>
  );
};

export default Home;
