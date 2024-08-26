import React from "react";
import { View, StyleSheet } from "react-native";

export const Divider: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    width: "90%",
  },
});
