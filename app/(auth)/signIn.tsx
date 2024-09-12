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
  StyleSheet,
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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

  const handleForgotPassword = () => {
    router.push("/forgotPassword");
  };

  return (
    <CustomKeyboardView inChat={false}>
      <StatusBar style="dark" />
      <BackgroundBlob />
      <View className="flex-1 gap-12" style={styles.signinView}>
        <View className="items-center">
          <Image
            source={require("../../assets/images/icon.png")}
            alt="Login"
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View className="gap-10">
          <Text
            style={styles.title}
            className="font-bold tracking-wider text-center text-indigo-900"
          >
            Inicio de sesión
          </Text>
          <View className="gap-4">
            <View
              style={styles.inputView}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl"
            >
              <View style={styles.iconView}>
                <Octicons name="mail" size={hp(2.7)} color="gray" />
              </View>
              <TextInput
                onChangeText={(value) => (emailRef.current = value)}
                style={styles.inputText}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="email@email.com"
                placeholderTextColor={"gray"}
              />
            </View>
            <View className="gap-6">
              <View
                style={styles.inputView}
                className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl"
              >
                <View style={styles.iconView}>
                  <Octicons name="lock" size={hp(2.7)} color="gray" />
                </View>
                <TextInput
                  onChangeText={(value) => (passwordRef.current = value)}
                  style={styles.inputText}
                  className="flex-1 font-semibold text-neutral-700"
                  placeholder="Contraseña"
                  secureTextEntry={!isPasswordVisible}
                  placeholderTextColor={"gray"}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <Octicons
                    name={isPasswordVisible ? "eye-closed" : "eye"}
                    size={hp(3)}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgotPasswordButton}>
                  ¿Olvidaste tu contraseña?
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={handleLogin}
                style={styles.loginButton}
              >
                <Text
                  style={styles.textLoginButton}
                  className="font-bold tracking-wider text-white"
                >
                  Iniciar sesión
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-center">
              <Text
                style={styles.textSignup}
                className="font-semibold text-neutral-500"
              >
                ¿Aún no tienes cuenta?{" "}
              </Text>
              <Pressable onPress={handleNavigate}>
                <Text
                  style={styles.textSignup}
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

const styles = StyleSheet.create({
  signinView: {
    paddingTop: hp(8),
    paddingHorizontal: wp(5),
  },
  image: {
    height: hp(20),
  },
  title: {
    fontSize: hp(4),
  },
  inputView: {
    height: hp(7),
  },
  iconView: {
    width: hp(3),
    alignItems: "center",
  },
  inputText: {
    fontSize: hp(2),
  },
  forgotPasswordButton: {
    color: "#1e3a8a",
    fontWeight: "bold",
    paddingVertical: hp(0.6),
  },
  loginButton: {
    height: hp(6.5),
    backgroundColor: "#1e3a8a",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  textLoginButton: {
    fontSize: hp(2.7),
  },
  textSignup: {
    fontSize: hp(1.8),
  },
});

export default SignIn;
