import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Eyvo 🎉</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MyVideos")}>
        <Text style={styles.buttonText}>Go to My Videos</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" },
  text: { color: "#fff", fontSize: 22, marginBottom: 20 },
  button: { backgroundColor: "#007bff", padding: 12, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
