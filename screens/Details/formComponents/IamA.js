import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

export default function IamA({ form, setForm }) {
  const [userOption, setUserOption] = useState(null);
  const genders = [
    {
      id: 1,
      value: "Male",
    },
    {
      id: 2,
      value: "Female",
    },
  ];
  const selectHandler = (value) => {
    setUserOption(value);
    setForm({ ...form, gender: value });
  };

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 15,
        marginTop: 100,
      }}
    >
      {genders.map((g) => (
        <View key={g.value}>
          <Pressable
            style={
              g.value === userOption
                ? styles.containerSecondary
                : styles.container
            }
            onPress={() => selectHandler(g.value)}
          >
            <Text
              style={
                g.value === userOption
                  ? styles.buttonTextSecondary
                  : styles.buttonText
              }
            >
              {g.value}
            </Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  containerSecondary: {
    width: 150,
    backgroundColor: "#f6697d",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 10,
    marginHorizontal: 5,
    flexDirection: "row",
    paddingLeft: 10,
    elevation: 20,
    shadowColor: "black",
  },
  buttonTextSecondary: {
    fontSize: 16,
    paddingVertical: 17,
    color: "white",
    fontWeight: "500",
    textAlign: "center",
    marginLeft: 10,
  },

  container: {
    width: 150,
    backgroundColor: "#FFF",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 15,
    borderColor: "#f3f3f3",
    marginHorizontal: 5,
    marginBottom: 10,
    flexDirection: "row",
    paddingLeft: 10,

    elevation: 20,
    shadowColor: "black",
  },
  buttonText: {
    fontSize: 16,
    paddingVertical: 17,
    color: "#f6697d",
    fontWeight: "500",
    textAlign: "center",
    marginLeft: 10,

    elevation: 20,
    shadowColor: "black",
  },
});
