import { View, Text, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons";
export default function Locate({ form, setForm }) {
  const [loc, setLoc] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let myLocation = await Location.getCurrentPositionAsync({});
      setLoc(myLocation);
      console.log(loc);
      setForm({ ...form, location: { loc } });
    })();
  }, []);
  console.log(form);
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (loc) {
    text = "Thank you! Your location has been saved.";
  }
  return (
    <View style={{ width: 400, height: 400 }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 65,
        }}
      >
        {text == "Waiting.." ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 60,
              marginLeft: -30,
            }}
          >
            <Feather name="check-circle" size={50} color="#f6697d" />
            <Text
              style={{
                color: "#000",
                fontSize: 32,
                textAlign: "center",
                width: 300,
              }}
            >
              {text}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
