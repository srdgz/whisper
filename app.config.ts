import { ExpoConfig, ConfigContext } from "@expo/config";
import "dotenv/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  const firebaseApiKey = process.env.FIREBASE_API_KEY || "";
  const firebaseProjectId = process.env.FIREBASE_PROJECT_ID || "";
  const firebaseAuthDomain = process.env.FIREBASE_AUTH_DOMAIN || "";
  const firebaseStorageBucket = process.env.FIREBASE_STORAGE_BUCKET || "";
  const firebaseMessagingSenderId =
    process.env.FIREBASE_MESSAGING_SENDER_ID || "";
  const firebaseAppId = process.env.FIREBASE_APP_ID || "";

  return {
    ...config,
    name: "whisper",
    slug: "whisper",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: ["expo-router"],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      firebaseApiKey,
      firebaseProjectId,
      firebaseAuthDomain,
      firebaseStorageBucket,
      firebaseMessagingSenderId,
      firebaseAppId,
    },
  };
};
