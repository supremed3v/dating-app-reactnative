import { View, Text, Image, ActivityIndicator } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../../context/AuthContext";
import Button from "../../components/Button";
import { signOut, updateProfile } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import firebase from "../../config/firebaseConfig";

const auth = getAuth();
const db = getFirestore();

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}
