import { View, Text, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import { Ionicons } from "@expo/vector-icons";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";
import { ref, onValue, push, update, remove } from "firebase/database";

import { Bio, IamA, Interests, LookingFor } from "./formComponents";
import Locate from "./formComponents/Location";
import EmailAndPassword from "./formComponents/EmailAndPassword";
import { AuthContext } from "../../context/AuthContext";

export default function Form({ navigation }) {
  const [screen, setScreens] = useState(0);
  const { user } = useContext(AuthContext);
  const auth = getAuth();
  const db = getFirestore();
  const [form, setForm] = useState({
    // I am a
    gender: "",

    // Looking for
    sexInterest: "",

    //Interest (Hobbies)
    hobbies: [],

    // Bio
    description: "",

    location: [],
  });
  const [authForm, setAuthForm] = useState({
    displayName: "",
    email: "",
    password: "",
    error: "",
    age: "",
  });

  if (user) {
    screen === 1;
  }
  const FormTitles = [
    "Sign Up",
    "Your gender",
    "Looking for?",
    "Your interests",
    "Your bio",
    "Your location",
  ];

  async function onSignUp() {
    if (authForm.email === "" || authForm.password === "") {
      setAuthForm({
        ...authForm,
        error: "Email and password is required to go through.",
      });
      return;
    }
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        authForm.email,
        authForm.password
      );
      try {
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName: authForm.displayName,
          email: authForm.email,
          age: authForm.age,
        });
        await setDoc(doc(db, "userChats", res.user.uid), {});
        setScreens((currScreen) => currScreen + 1);
      } catch (error) {
        setAuthForm({
          ...authForm,
          error: error.message,
        });
      }
    } catch (error) {
      setAuthForm({
        ...authForm,
        error: error.message,
      });
    }
  }

  const FormComponents = () => {
    if (screen === 0) {
      return <EmailAndPassword authForm={authForm} setAuthForm={setAuthForm} />;
    } else if (screen === 1) {
      return <IamA form={form} setForm={setForm} />;
    } else if (screen === 2) {
      return <LookingFor form={form} setForm={setForm} />;
    } else if (screen === 3) {
      return <Interests form={form} setForm={setForm} />;
    } else if (screen === 4) {
      return <Bio form={form} setForm={setForm} />;
    } else {
      return <Locate form={form} setForm={setForm} />;
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

  const onButtonSubmit = async () => {
    try {
      const id = user.uid;
      await setDoc(
        doc(db, "users", id),
        {
          ...form,
        },
        { merge: true }
      );
      navigation.navigate("Home");
    } catch (error) {
      setAuthForm({
        ...authForm,
        error: error.message,
      });
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
            marginLeft: 50,
            marginTop: 40,
          }}
        >
          {FormTitles[screen]}
        </Text>
      </View>
      <View>{FormComponents()}</View>
      <View style={{ bottom: 50, left: 70, position: "absolute" }}>
        {screen !== 0 ? (
          <Button
            title={screen === FormTitles.length - 1 ? "Finish" : "Continue"}
            onPress={() => {
              if (screen === FormTitles.length - 1) {
                onButtonSubmit();
              } else {
                onHandleNext();
              }
            }}
          />
        ) : (
          <Button title="Signup to continue" onPress={onSignUp} />
        )}
      </View>
      {screen === 0 ? null : (
        <Pressable
          style={{
            width: 50,
            height: 50,
            backgroundColor: "#fefefe",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 15,
            position: "absolute",
            top: -20,
            left: 20,
            borderWidth: 1,
            borderColor: "#E8E6EA",
          }}
          onPress={onHandlePrev}
        >
          <Ionicons name="chevron-back" size={24} color="#E94057" />
        </Pressable>
      )}
    </View>
  );
}
