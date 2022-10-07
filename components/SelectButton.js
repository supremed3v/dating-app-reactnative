import { View, Text, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SelectButton({ title, isChecked, onPress }) {
  const iconName = isChecked ? "checkbox-marked" : "checkbox-blank-outline";

  return (
    <View>
      <Pressable
        onPress={onPress}
        style={{
          backgroundColor: "white",
          borderRadius: 10,
          padding: 10,
          margin: 5,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons name={iconName} size={24} color="#000" />
        <Text>{title}</Text>
      </Pressable>
    </View>
  );
}
