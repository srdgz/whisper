import React, { useState } from "react";
import BackgroundBlob from "../components/BackgroundBlob";
import CustomKeyboardView from "../components/CustomKeyboardView";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert("Error", "Por favor ingresa tu correo electrónico.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Correo enviado",
        "Hemos enviado un enlace para restablecer tu contraseña a tu correo."
      );
      router.push("/signIn");
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        Alert.alert("Error", "No se encontró una cuenta con este correo.");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Error", "El correo ingresado no es válido.");
      } else {
        Alert.alert("Error", "Ocurrió un error. Por favor, intenta de nuevo.");
      }
    }
  };

  return (
    <CustomKeyboardView inChat={false}>
      <StatusBar style="dark" />
      <BackgroundBlob />
      <View className="flex-1" style={styles.forgotPasswordView}>
        <Text style={styles.textTitle}>Recuperar Contraseña</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Introduce tu correo"
          placeholderTextColor="#ffffff"
          style={styles.textInputMail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity
          onPress={handlePasswordReset}
          style={styles.sendButton}
        >
          <Text style={styles.textSendButton}>
            Enviar enlace de restablecimiento
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/signIn")}>
          <Text style={styles.goBackButton}>Volver a inicio de sesión</Text>
        </TouchableOpacity>
      </View>
    </CustomKeyboardView>
  );
};

const styles = StyleSheet.create({
  forgotPasswordView: {
    paddingTop: hp(38),
    paddingHorizontal: wp(4),
  },
  textTitle: {
    fontSize: hp(4),
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: hp(4),
    color: "#1e3a8a",
  },
  textInputMail: {
    height: hp(7),
    borderColor: "#ccc",
    color: "white",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: wp(4),
    fontSize: hp(2.2),
    marginBottom: hp(2),
  },
  sendButton: {
    height: hp(6.5),
    backgroundColor: "#009688",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp(2),
  },
  textSendButton: {
    fontSize: hp(2.7),
    color: "white",
    fontWeight: "bold",
  },
  goBackButton: {
    fontSize: hp(2.2),
    color: "#1e3a8a",
    textAlign: "center",
  },
});

export default ForgotPassword;
