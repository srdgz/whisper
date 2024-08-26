import React, { useRef, useState } from "react";
import CustomKeyboardView from "../components/CustomKeyboardView";
import BackgroundBlob from "../components/BackgroundBlob";
import {
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { FontAwesome5, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "../context/authContext";

const SignUp: React.FC = () => {
  const router = useRouter();
  const { register } = useAuth();
  const emailRef = useRef<string>("");
  const passwordRef = useRef<string>("");
  const usernameRef = useRef<string>("");

  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current || !usernameRef.current) {
      Alert.alert("Registro", "Por favor, rellena los campos necesarios");
      return;
    }
    try {
      const response = await register(
        emailRef.current,
        passwordRef.current,
        usernameRef.current
      );
      if (!response.success) {
        Alert.alert(
          "Registro",
          response.msg || "Hubo un problema al registrarse"
        );
      }
    } catch (error) {
      console.error("Error inesperado en el registro:", error);
      Alert.alert(
        "Registro",
        "Ocurrió un error inesperado. Por favor, intenta de nuevo."
      );
    }
  };

  const handleNavigate = () => {
    router.back();
  };

  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />
      <BackgroundBlob />
      <View
        className="flex-1 gap-12"
        style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}
      >
        <View className="items-center">
          <Image
            source={require("../../assets/images/register.png")}
            alt="Login"
            style={{ height: hp(20) }}
            resizeMode="contain"
          />
        </View>
        <View className="gap-10">
          <Text
            style={{ fontSize: hp(4) }}
            className="font-bold tracking-wider text-center text-indigo-900"
          >
            Registro
          </Text>
          <View className="gap-4">
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl"
            >
              <View style={{ width: hp(3), alignItems: "center" }}>
                <FontAwesome5 name="user" size={hp(2.7)} color="gray" />
              </View>
              <TextInput
                onChangeText={(value) => (usernameRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Nombre de usuario"
                placeholderTextColor={"gray"}
              />
            </View>
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl"
            >
              <View style={{ width: hp(3), alignItems: "center" }}>
                <Octicons name="mail" size={hp(2.7)} color="gray" />
              </View>
              <TextInput
                onChangeText={(value) => (emailRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="email@email.com"
                placeholderTextColor={"gray"}
              />
            </View>
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl"
            >
              <View style={{ width: hp(3), alignItems: "center" }}>
                <Octicons name="lock" size={hp(2.7)} color="gray" />
              </View>
              <TextInput
                onChangeText={(value) => (passwordRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Contraseña"
                secureTextEntry
                placeholderTextColor={"gray"}
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={handleRegister}
                style={{
                  height: hp(6.5),
                  backgroundColor: "#1e3a8a",
                  borderRadius: 12,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: hp(2.7) }}
                  className="font-bold tracking-wider text-white"
                >
                  Registrar
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-center">
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-neutral-500"
              >
                Ya tengo una cuenta.{" "}
              </Text>
              <Pressable onPress={handleNavigate}>
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className="font-bold text-indigo-900"
                >
                  Iniciar sesión
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default SignUp;
