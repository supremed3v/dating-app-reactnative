import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import Button from "../../components/Button";
import { AntDesign } from "@expo/vector-icons";
import ButtonSecondary from "../../components/ButtonSecondary";

export default function Signup({ navigation }) {
  const onSignupWithEmail = () => {
    navigation.navigate("Form");
  };

  const onSignIn = () => {
    navigation.navigate("SignIn");
  };
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://img.freepik.com/free-vector/dating-couple-enjoying-romantic-dinner_74855-5233.jpg?w=740&t=st=1664828483~exp=1664829083~hmac=20b13370f1b8f3870549d0c4bde0f403bb7ef0187c1bfbf1c74bff4826e2294d",
        }}
        resizeMode="contain"
        style={styles.image}
      />
      <View style={{ marginHorizontal: 10 }}>
        <Text style={styles.header}>Sign up to continue</Text>
      </View>
      <Button title="Signup with email" onPress={onSignupWithEmail} />
      <View style={{ marginTop: 10 }}>
        <ButtonSecondary title="Sign In" onPress={onSignIn} />
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 50 }}
      >
        <View style={{ height: 1, width: 50, backgroundColor: "#E8E6EA" }} />
        <View>
          <Text style={{ width: 100, textAlign: "center" }}>
            or signup with
          </Text>
        </View>
        <View style={{ width: 50, height: 1, backgroundColor: "#E8E6EA" }} />
      </View>
      <View style={{ flexDirection: "row", marginVertical: 20 }}>
        <View style={styles.buttonContainer}>
          <AntDesign name="facebook-square" size={35} color="#f6697d" />
        </View>
        <View style={styles.buttonContainer}>
          <AntDesign name="google" size={35} color="#f6697d" />
        </View>
      </View>
      <View style={{ flexDirection: "row", marginTop: 40 }}>
        <TouchableOpacity>
          <Text style={styles.conditionsText}>Terms of use</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.conditionsText}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    juscifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
  buttonContainer: {
    borderRadius: 15,
    borderColor: "#E8E6EA",
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  conditionsText: {
    color: "#f6697d",
    marginHorizontal: 30,
  },
});
