import React, { useRef } from "react";
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
import { Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "../context/authContext";

const SignIn: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();
  const emailRef = useRef<string>("");
  const passwordRef = useRef<string>("");

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Inicia sesión", "Por favor, rellena los campos necesarios");
      return;
    }
    try {
      const response = await login(emailRef.current, passwordRef.current);
      if (!response.success) {
        Alert.alert(
          "Iniciar sesión",
          response.msg || "Hubo un problema al iniciar sesión"
        );
      }
    } catch (error) {
      console.error("Error inesperado en el inicio de sesión:", error);
      Alert.alert(
        "Iniciar sesión",
        "Ocurrió un error inesperado. Por favor, intenta de nuevo."
      );
    }
  };

  const handleNavigate = () => {
    router.push("/signUp");
  };

  return (
    <CustomKeyboardView inChat={false}>
      <StatusBar style="dark" />
      <BackgroundBlob />
      <View
        className="flex-1 gap-12"
        style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}
      >
        <View className="items-center">
          <Image
            source={require("../../assets/images/icon.png")}
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
            Inicio de sesión
          </Text>
          <View className="gap-4">
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
            <View className="gap-6">
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
                  placeholder="contraseña"
                  secureTextEntry
                  placeholderTextColor={"gray"}
                />
              </View>
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-right text-neutral-500"
              >
                ¿Olvidaste tu contraseña?
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={handleLogin}
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
                  Iniciar sesión
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-center">
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-neutral-500"
              >
                ¿Aún no tienes cuenta?{" "}
              </Text>
              <Pressable onPress={handleNavigate}>
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className="font-bold text-indigo-900"
                >
                  Registrar una cuenta
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default SignIn;
