import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import Button from "../../components/Button";
import {
  Bio,
  IamA,
  Interests,
  Location,
  LookingFor,
  MyPhotos,
  ProfileDetails,
} from "./formComponents";
export default function Form() {
  const [form, setForm] = useState({
    // Profile Details
    age: "",
    avatar: "",
    first_name: "",
    last_name: "",

    // I am a
    gender: "",

    // Looking for
    sexInterest: "",

    //Interest (Hobbies)
    hobbies: [],

    // Bio
    description: "",

    //My Photos

    photos: [],
  });
  const [screen, setScreens] = useState(0);

  const FormTitles = [
    "Profile details",
    "I am a",
    "I am looking for",
    "My interests",
    "My location",
    "My bio",
    "My photos",
  ];

  const FormComponents = () => {
    if (screen === 0) {
      return <ProfileDetails form={form} setForm={setForm} />;
    } else if (screen === 1) {
      return <IamA form={form} setForm={setForm} />;
    } else if (screen === 2) {
      return <LookingFor form={form} setForm={setForm} />;
    } else if (screen === 3) {
      return <Interests form={form} setForm={setForm} />;
    } else if (screen === 4) {
      return <Location form={form} setForm={setForm} />;
    } else if (screen === 5) {
      return <Bio form={form} setForm={setForm} />;
    } else {
      return <MyPhotos form={form} setForm={setForm} />;
    }
  };

  const onHandleNext = () => {
    if (screen === FormTitles.length - 1) {
      return;
    } else {
      setScreens((currScreen) => currScreen + 1);
    }
  };

  const onHandlePrev = () => {
    if (screen === 0) {
      return;
    } else {
      setScreens((currScreen) => currScreen - 1);
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 70 }}>
      <View>
        <Text
          style={{
            textAlign: "left",
            fontWeight: "bold",
            fontSize: 34,
            marginLeft: 24,
          }}
        >
          {FormTitles[screen]}
        </Text>
      </View>
      <View>{FormComponents()}</View>
      <View style={{ top: 350, left: 50 }}>
        <Button
          title={screen === FormTitles.length - 1 ? "Finish" : "Continue"}
          onPress={onHandleNext}
        />
        {screen === 0 ? null : <Button title="Back" onPress={onHandlePrev} />}
      </View>
    </View>
  );
}
