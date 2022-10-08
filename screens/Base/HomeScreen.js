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
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const handleUpload = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });
    const ref = firebase.storage().ref().child(`Pictures/Image1`);
    const snapshot = ref.put(blob);
    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        setUploading(false);
        console.log(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false);
          console.log("Download URL: ", url);
          setImage(url);
          blob.close();
          return url;
        });
      }
    );
    try {
      await updateProfile(user, {
        photoURL: image,
      });
      await setDoc(
        doc(db, "users", user.uid),
        {
          photoURL: image,
        },
        { merge: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Name:- {user?.displayName}</Text>
      {user.photoURL === null ? (
        <Text>Photo:- No photo</Text>
      ) : (
        <Text>Photo:- Available</Text>
      )}
      <View>
        {!image ? (
          <Button title={"Browse Image"} onPress={pickImage} />
        ) : (
          <Image
            source={{ uri: user.photoURL }}
            style={{ width: 200, height: 200 }}
          />
        )}
        {!uploading ? (
          <Button title={"Upload Image"} onPress={handleUpload} />
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
      </View>
      <Button
        title={"Sign Out"}
        onPress={() => {
          signOut(auth);
          navigation.navigate("GettingStarted");
        }}
      />
    </View>
  );
}
