import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
export default function Locate() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords.latitude, location.coords.longitude);
      console.log(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = "Thank you!";
  }
  return (
    <View>
      <Text>{text}</Text>
    </View>
  );
}
