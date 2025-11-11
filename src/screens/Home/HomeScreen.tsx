import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const HomeScreen = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, {user.name || "Guest"} 🎉</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#111" },
  text: { color: "#fff", fontSize: 22 },
});
