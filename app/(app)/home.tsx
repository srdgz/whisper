import React, { useEffect, useState } from "react";
import ChatList from "../components/ChatList";
import Loading from "../components/Loading";
import Octicons from "@expo/vector-icons/Octicons";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, View, Alert, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { User } from "../constants/types";
import { useAuth } from "../context/authContext";
import { chatsRef, usersRef } from "../lib/firebase";
import { getDocs, query, where } from "firebase/firestore";
import SearchUserModal from "./searchUserModal";
import createChat from "../lib/createChat";

const Home: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isSearchUserModalVisible, setIsSearchUserModalVisible] =
    useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUsersWithChats = async () => {
    if (!user?.userId) return;
    try {
      const q = query(chatsRef, where("users", "array-contains", user.userId));
      const querySnapshot = await getDocs(q);
      const userIds: string[] = [];
      querySnapshot.forEach((doc) => {
        const chatData = doc.data();
        chatData.users.forEach((userId: string) => {
          if (userId !== user.userId) {
            userIds.push(userId);
          }
        });
      });
      const uniqueUserIds = [...new Set(userIds)];
      if (uniqueUserIds.length > 0) {
        const usersQuery = query(
          usersRef,
          where("userId", "in", uniqueUserIds)
        );
        const userSnapshot = await getDocs(usersQuery);
        const data: User[] = userSnapshot.docs.map(
          (doc) =>
            ({
              userId: doc.id,
              ...doc.data(),
            } as User)
        );
        setUsers(data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error al obtener los chats: ", error);
      Alert.alert("Error", "Hubo un problema al cargar los chats.");
    }
  };

  const handleSearchUser = async () => {
    if (!email) {
      Alert.alert("Error", "Por favor ingresa un correo electrónico.");
      return;
    }
    if (!user?.userId) {
      Alert.alert(
        "Error",
        "No se pudo obtener la información del usuario actual."
      );
      return;
    }
    setIsLoading(true);
    try {
      const q = query(usersRef, where("email", "==", email.trim()));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        Alert.alert(
          "Usuario no encontrado",
          "No existe un usuario registrado con este correo."
        );
      } else {
        const foundUser = querySnapshot.docs[0].data() as User;
        await createChat(user.userId, foundUser.userId);
        setUsers((prevUsers) => {
          if (!prevUsers.some((u) => u.userId === foundUser.userId)) {
            return [...prevUsers, foundUser];
          }
          return prevUsers;
        });
        Alert.alert(
          "Chat creado",
          `Ya puedes empezar a hablar con ${foundUser.username}`
        );
      }
    } catch (error) {
      console.error("Error al buscar el usuario:", error);
      Alert.alert("Error", "Hubo un problema al buscar el usuario.");
    } finally {
      setIsLoading(false);
      setIsSearchUserModalVisible(false);
    }
  };

  useEffect(() => {
    getUsersWithChats();
  }, [user]);

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />
      {isLoading ? (
        <View className="flex items-center" style={{ top: hp(30) }}>
          <Loading size={hp(10)} />
        </View>
      ) : users.length > 0 ? (
        <ChatList currentUser={user} users={users} />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text style={{ fontSize: 16, color: "gray" }}>
            No hay chats iniciados.
          </Text>
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

      <SearchUserModal
        visible={isSearchUserModalVisible}
        email={email}
        setEmail={setEmail}
        isLoading={isLoading}
        onSearch={handleSearchUser}
        onClose={() => setIsSearchUserModalVisible(false)}
      />
    </View>
  );
};

export default Home;
