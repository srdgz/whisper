import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { blurhash } from "../constants/common";
import { ChatModalProps } from "../constants/types";

const ChatModal: React.FC<ChatModalProps> = ({ visible, onClose, user }) => {
  const getCorrectProfileImageURL = (url: string) => {
    return url.replace("/images/", "/images%2F");
  };

  const profileImageURL = user?.profileImage
    ? getCorrectProfileImageURL(user.profileImage)
    : null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-gray-200 bg-opacity-50">
        <View className="w-11/12 bg-white p-6 rounded-lg items-center">
          {profileImageURL && (
            <Image
              source={{ uri: profileImageURL }}
              style={styles.image}
              placeholder={blurhash}
              transition={500}
              cachePolicy="disk"
            />
          )}
          <Text style={styles.textUsername}>{user?.username}</Text>
          <Text style={styles.textEmail}>{user?.email}</Text>
          <View className="bg-white p-4 rounded-lg w-11/12">
            <Pressable
              onPress={onClose}
              className="mt-2 p-2 bg-teal-500 rounded-md"
            >
              <Text className="text-white text-center text-xl">Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  image: {
    height: hp(10),
    aspectRatio: 1,
    borderRadius: 100,
    marginBottom: 20,
  },
  textUsername: {
    fontSize: hp(3),
    fontWeight: "bold",
    marginBottom: 10,
  },
  textEmail: {
    fontSize: hp(2.2),
    color: "gray",
  },
});

export default ChatModal;
