import React, { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, Pressable } from "react-native";
import { SearchUserModalProps } from "../constants/types";

const SearchUserModal: React.FC<SearchUserModalProps> = ({
  visible,
  email,
  setEmail,
  isLoading,
  onSearch,
  onClose,
}) => {
  const [localEmail, setLocalEmail] = useState(email);

  const handleClose = () => {
    setEmail(localEmail);
    onClose();
  };

  useEffect(() => {
    if (visible) {
      setLocalEmail("");
    }
  }, [visible]);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View className="flex-1 justify-center items-center bg-gray-200 bg-opacity-50">
        <View className="bg-white p-8 rounded-lg w-11/12">
          <Text className="text-xl text-gray-700 font-bold mb-4">
            Buscar usuario por correo
          </Text>
          <TextInput
            placeholder="Introduce el email"
            value={localEmail}
            onChangeText={setLocalEmail}
            className="border p-3 rounded-md border-teal-400 mb-4"
            keyboardType="email-address"
          />
          <Pressable
            onPress={() => {
              onSearch(localEmail);
            }}
            disabled={isLoading}
            className="mt-2 p-2 bg-teal-500 rounded-md"
          >
            <Text className="text-white text-center text-xl">
              {isLoading ? "Buscando..." : "Buscar"}
            </Text>
          </Pressable>
          <Pressable
            onPress={handleClose}
            className="mt-6 p-2 bg-gray-300 rounded-md"
          >
            <Text className="text-center text-gray-700 text-xl">Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default SearchUserModal;
