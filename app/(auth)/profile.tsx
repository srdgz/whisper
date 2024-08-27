import React, { useState } from "react";
import UploadImage from "../lib/uploadImage";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { View, Text, Pressable, TextInput, Image, Alert } from "react-native";
import { useAuth } from "../context/authContext";

const Profile: React.FC = () => {
  const { user, updateUserProfile } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState(user?.username || "");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleChangeProfileImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets[0]) {
      const { uri, fileName } = result.assets[0];
      const name =
        fileName || uri.split("/").pop() || `image_${new Date().getTime()}.jpg`;
      if (uri) {
        try {
          const response = await fetch(uri);
          const blob = await response.blob();
          const file = new File([blob], name, { type: blob.type });
          const downloadURL = await UploadImage(file, user?.id || "");
          setSelectedImage(downloadURL);
          await updateUserProfile({ profileImage: downloadURL });
          Alert.alert(
            "Imagen actualizada",
            "Tu imagen de perfil se ha actualizado correctamente"
          );
        } catch (error) {
          console.error("Error updating profile image:", error);
          Alert.alert("Error", "No se pudo actualizar la imagen de perfil");
        }
      } else {
        console.error("No URI found");
      }
    } else {
      console.log("Image picker canceled or no assets found");
    }
  };

  const handleUpdate = async () => {
    if (user?.id) {
      try {
        await updateUserProfile({ username });
        Alert.alert(
          "Perfil actualizado",
          "Tu perfil se ha actualizado correctamente"
        );
      } catch (error) {
        Alert.alert("Error", "No se pudo actualizar el perfil");
      }
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View className="flex-1 p-10 pt-20 bg-white">
      <Pressable
        onPress={handleChangeProfileImage}
        className="mb-4 items-center"
      >
        <Image
          source={{ uri: selectedImage || user?.profileImage || "" }}
          className="h-32 w-32 rounded-full"
        />
      </Pressable>
      <View className="my-4">
        <View className="mb-4">
          <Text className="text-lg font-medium">Nombre de usuario</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Nombre de usuario"
            className="border border-gray-300 rounded-md p-2 mt-1"
          />
        </View>
        <View className="mb-4">
          <Text className="text-lg font-medium">Email</Text>
          <TextInput
            value={user?.email}
            editable={false}
            className="border border-gray-300 rounded-md p-2 mt-1 bg-sky-100"
          />
        </View>
        <View className="mb-4">
          <Text className="text-lg font-medium">Contraseña</Text>
          <TextInput
            value="******"
            editable={false}
            secureTextEntry
            className="border border-gray-300 rounded-md p-2 mt-1 bg-sky-100"
          />
        </View>
      </View>
      <Pressable
        onPress={handleUpdate}
        className="mt-2 p-2 bg-teal-500 rounded-md"
      >
        <Text className="text-white text-center text-xl">Guardar</Text>
      </Pressable>
      <Pressable
        onPress={handleBack}
        className="mt-6 p-2 bg-gray-300 rounded-md"
      >
        <Text className="text-center text-gray-700 text-xl">Volver atrás</Text>
      </Pressable>
    </View>
  );
};

export default Profile;
