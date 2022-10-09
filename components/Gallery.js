import { View, Text, ActivityIndicator, Image, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import firebase from "../config/firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import Button from "./Button";

export default function Gallery() {
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [profileData, setProfileData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    const subcriber = firebase
      .firestore()
      .collection("users")
      .doc(user?.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setProfileData(documentSnapshot.data());
        }
      });
    setLoading(true);
    return () => subcriber;
  }, []);
  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      console.log(image);
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

    const ref = firebase
      .storage()
      .ref()
      .child(`Pictures/${user.displayName + Date.now()}`);
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
      await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .update({
          photos: firebase.firestore.FieldValue.arrayUnion(image),
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      {loading === false ? (
        <View>
          <Text>Populating Data</Text>
          <ActivityIndicator size={"large"} color={"#000"} />
        </View>
      ) : (
        <View>
          <FlatList
            data={profileData.photos}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={{ width: 100, height: 100 }}
              />
            )}
            keyExtractor={(item) => item}
          />
          <View style={{ marginTop: 50 }}>
            <Button title={"Browse"} onPress={imagePicker} />
            {image && (
              <Image
                source={{ uri: image.uri }}
                style={{ width: 200, height: 200 }}
              />
            )}
            <Button title={"Upload"} onPress={handleUpload} />
          </View>
          <Text>{profileData.sexInterest}</Text>
        </View>
      )}
    </View>
  );
}
