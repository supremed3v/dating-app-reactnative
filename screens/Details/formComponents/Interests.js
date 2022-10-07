import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import {
  MaterialIcons,
  Foundation,
  FontAwesome,
  Fontisto,
  Entypo,
} from "@expo/vector-icons";

export default function Interests() {
  const [interest, setInterest] = useState([]);
  const options = [
    {
      label: "Sports",
      icon: <MaterialIcons name="sports-football" size={20} color="#000" />,
    },
    {
      label: "Shopping",
      icon: <MaterialIcons name="shopping-bag" size={20} color="#000" />,
    },
    {
      label: "Swimming",
      icon: <MaterialIcons name="waves" size={20} color="#000" />,
    },
    {
      label: "Traveling",
      icon: <Foundation name="mountains" size={20} color="#000" />,
    },
    {
      label: "Art",
      icon: <FontAwesome name="paint-brush" size={20} color="#000" />,
    },
    {
      label: "Music",
      icon: <FontAwesome name="music" size={20} color="#000" />,
    },
    {
      label: "Extreme",
      icon: <Fontisto name="hot-air-balloon" size={20} color="#000" />,
    },
    {
      label: "Video Games",
      icon: <Entypo name="game-controller" size={20} color="#000" />,
    },
  ];
  function pickInterest(selectedInterest) {
    if (interest.includes(selectedInterest)) {
      setInterest(
        interest.filter((interests) => interests != selectedInterest)
      );
      return;
    }
    setInterest((interest) => interest.concat(selectedInterest));
    console.log(interest);
  }

  return (
    <View style={{ width: 500, height: 50, marginTop: 50 }}>
      <View style={styles.wrapper}>
        {options.map((option) => (
          <View>
            <Pressable
              onPress={() => pickInterest(option.label)}
              style={
                interest.includes(option.label)
                  ? styles.container
                  : styles.containerSecondary
              }
            >
              <View style={{ marginRight: 10 }}>{option.icon}</View>
              <Text
                style={
                  interest.includes(option.label)
                    ? styles.buttonText
                    : styles.buttonTextSecondary
                }
              >
                {option.label}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 30,
  },
  container: {
    width: 150,
    backgroundColor: "#f6697d",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 10,
    marginHorizontal: 5,
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 16,
    paddingVertical: 17,
    color: "white",
    fontWeight: "500",
    textAlign: "center",
  },

  containerSecondary: {
    width: 150,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderColor: "#f3f3f3",
    marginHorizontal: 5,
    marginBottom: 10,
    flexDirection: "row",
  },
  buttonTextSecondary: {
    fontSize: 16,
    paddingVertical: 17,
    color: "#f6697d",
    fontWeight: "500",
    textAlign: "center",
  },
});
