import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function ProfileDetails() {
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(new Date(Date.now()));
  const [uploading, setUploading] = useState();
  const [borderColor, setBorderColor] = useState("#e8e6ea");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setDate(value);
    console.log(value);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 200,
        backgroundColor: "#fff",
        position: "relative",
      }}
    >
      <Pressable
        onPress={pickImage}
        style={{
          width: 60,
          height: 60,
          backgroundColor: "#f6697d",
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 3,
          borderColor: "white",
          position: "absolute",
          bottom: 0,
          right: 90,
          zIndex: 1,
        }}
      >
        <Entypo name="camera" size={24} color="white" />
      </Pressable>

      <Image
        source={image ? { uri: image } : require("./avatar.png")}
        style={{ width: 150, height: 150, borderRadius: 30 }}
      />
      <View
        style={{
          position: "relative",
          top: 50,
          width: 280,
          height: 200,
        }}
      >
        <TextInput
          placeholder="First Name"
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
          }}
        />
        <TextInput
          placeholder="Last Name"
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
          }}
        />
        {!isPickerShow && (
          <Pressable
            style={{
              width: 280,
              backgroundColor: "#ffe0e5",
              alignItems: "center",
              // opacity: 0.1,
              height: 50,
              borderRadius: 10,
              marginTop: 10,
              flexDirection: "row",
            }}
            onPress={showPicker}
          >
            <FontAwesome5
              name="calendar-alt"
              size={24}
              color="#f6697d"
              style={{ marginRight: 14, paddingLeft: 15 }}
            />
            <Text style={{ color: "#E94057" }}>Choose birthday date</Text>
          </Pressable>
        )}
        {isPickerShow && (
          <DateTimePicker
            value={date}
            mode={"date"}
            display="default"
            onChange={onChange}
            is24Hour={true}
          />
        )}
      </View>
    </View>
  );
}
