import React from "react";
import { View, Text, Platform, StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { blurhash } from "../constants/common";
import { useAuth } from "../context/authContext";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { MenuItem } from "./CustomMenuItems";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Divider } from "./Divider";
import { useRouter } from "expo-router";

const ios = Platform.OS === "ios";

const HomeHeader = () => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const { user, logout } = useAuth();

  const handleProfile = () => {
    router.push("/profile");
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View
      style={[{ paddingTop: ios ? top : top + 10 }, styles.container]}
      className="flex-row justify-between px-5 pb-6 rounded-b-3xl shadow"
    >
      <View>
        <Text style={styles.title} className="font-medium text-white">
          Chats
        </Text>
      </View>
      <View>
        <Menu>
          <MenuTrigger>
            <Image
              style={styles.image}
              source={user?.profileImage}
              placeholder={blurhash}
              transition={500}
            />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                borderRadius: 10,
                borderCurve: "continuous",
                marginTop: 40,
                marginLeft: -5,
                backgroundColor: "white",
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 0 },
                width: 170,
              },
            }}
          >
            <MenuItem
              text="Ajustes de perfil"
              action={handleProfile}
              value={null}
              icon={<Feather name="user" size={hp(2.5)} color="#6AB0DE" />}
            />
            <Divider />
            <MenuItem
              text="Cerrar sesión"
              action={handleLogout}
              value={null}
              icon={<AntDesign name="logout" size={hp(2.5)} color="#6AB0DE" />}
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4DB6AC",
  },
  title: {
    fontSize: hp(4),
  },
  image: {
    height: hp(4.3),
    aspectRatio: 1,
    borderRadius: 100,
  },
});

export default HomeHeader;
