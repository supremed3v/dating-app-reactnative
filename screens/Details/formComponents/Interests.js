import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
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
      label: "Gaming",
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
  }
  console.log(interest);

  return (
    <View style={{ width: 400, height: 100 }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          paddingBottom: 30,
        }}
      >
        <Text
          style={{
            width: 300,
            textAlign: "left",
            fontSize: 14,
            color: "#373737",
            fontWeight: "600",
            fontStyle: "normal",
          }}
        >
          Select a few of your interests and let everyone know what you’re
          passionate about.
        </Text>
      </View>
      <View style={styles.wrapper}>
        {options.map((option) => (
          <View
            key={option.label}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Pressable
              onPress={() => pickInterest(option.label)}
              style={
                interest.includes(option.label)
                  ? styles.container
                  : styles.containerSecondary
              }
            >
              <View
                style={{
                  marginLeft: 10,
                  alignContent: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                {option.icon}
              </View>
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
    marginLeft: -2,
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 30,
    justifyContent: "space-evenly",
  },
  container: {
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
  buttonText: {
    fontSize: 16,
    paddingVertical: 17,
    color: "white",
    fontWeight: "500",
    textAlign: "center",
    marginLeft: 10,
  },

  containerSecondary: {
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
  },
  buttonTextSecondary: {
    fontSize: 16,
    paddingVertical: 17,
    color: "#f6697d",
    fontWeight: "500",
    textAlign: "center",
    marginLeft: 10,
  },
});
