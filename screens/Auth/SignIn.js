import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import Button from "../../components/Button";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export default function SignIn({ navigation }) {
  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
  });
  const [borderColor, setBorderColor] = useState("#e8e6ea");

  async function signIn() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate("Home");
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  return (
    <View>
      <View
        style={{
          top: 250,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!!value.error && <Text style={{ color: "red" }}>{value.error}</Text>}
        <TextInput
          placeholder="Email"
          onBlur={() => setBorderColor("#fefefe")}
          onFocus={() => setBorderColor("#f6697d")}
          placeholderTextColor="gray"
          style={{
            borderColor,
            borderWidth: 3,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 20,
            borderRadius: 10,
            fontSize: 16,
            width: 280,
            marginBottom: 10,
          }}
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
        />
        <TextInput
          placeholder="Password"
          onBlur={() => setBorderColor("#fefefe")}
          onFocus={() => setBorderColor("#f6697d")}
          placeholderTextColor="gray"
          style={{
            borderColor,
            borderWidth: 3,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 20,
            borderRadius: 10,
            fontSize: 16,
            width: 280,
          }}
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
        />
        <View style={{ paddingTop: 10 }}>
          <Button title="Sign In" onPress={signIn} />
        </View>
      </View>
    </View>
  );
}
