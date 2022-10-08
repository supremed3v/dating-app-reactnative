import { View, Text, TextInput } from "react-native";
import React from "react";

export default function Bio({ form, setForm }) {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 20 }}>
        Let people know about you.
      </Text>
      <TextInput
        value={form.description}
        onChangeText={(description) => {
          setForm({ ...form, description });
        }}
        placeholder="Bio"
        style={{
          backgroundColor: "white",
          height: 40,
          width: 300,
          paddingLeft: 10,
          borderRadius: 10,
          marginTop: 40,
        }}
      />
      <Text>{form.description}</Text>
    </View>
  );
}
