import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function ButtonSecondary({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 250,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#f3f3f3",
  },
  buttonText: {
    fontSize: 16,
    paddingVertical: 17,
    color: "#f6697d",
    fontWeight: "500",
    textAlign: "center",
  },
});
