import { MenuOption } from "react-native-popup-menu";
import { View, Text, StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import React from "react";
import { MenuItemProps } from "../constants/types";

export const MenuItem: React.FC<MenuItemProps> = ({
  text,
  action,
  value,
  icon,
}) => {
  return (
    <MenuOption onSelect={() => action(value)}>
      <View className="px-4 py-1 flex-row justify-between items-center">
        {icon ? <View>{icon}</View> : <Text>icon</Text>}
        <Text style={styles.text} className="font-semibold text-neutral-500">
          {text}
        </Text>
      </View>
    </MenuOption>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: hp(1.7),
  },
});
