import { View, Text, TextInput, Pressable, Platform } from "react-native";

import React, { useState, useEffect } from "react";

export default function EmailAndPassword({ authForm, setAuthForm }) {
  const [borderColor, setBorderColor] = useState("#e8e6ea");
  return (
    <View
      style={{
        top: 50,
        width: 400,
        height: 200,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!!authForm.error && (
        <Text style={{ color: "red" }}>{authForm.error}</Text>
      )}
      <TextInput
        placeholder="Name"
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
        value={authForm.displayName}
        onChangeText={(displayName) =>
          setAuthForm({ ...authForm, displayName })
        }
      />
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
        }}
        value={authForm.email}
        onChangeText={(email) => setAuthForm({ ...authForm, email })}
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
          marginTop: 10,
          width: 280,
        }}
        value={authForm.password}
        onChangeText={(password) => setAuthForm({ ...authForm, password })}
      />
      <TextInput
        placeholder="Age"
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
          marginTop: 10,
          width: 280,
        }}
        value={authForm.age}
        onChangeText={(age) => setAuthForm({ ...authForm, age })}
        keyboardType="numeric"
      />
    </View>
  );
}
