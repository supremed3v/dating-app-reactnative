import { View, Text, ActivityIndicator, Image, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import firebase from "../config/firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import Button from "./Button";
import { SwiperFlatList } from "react-native-swiper-flatlist";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

export default function Gallery() {
  const { user, userData } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [profileData, setProfileData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const onSelect = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
  };

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
        snapshot.snapshot.ref
          .getDownloadURL()
          .then((url) => {
            console.log("Download URL: ", url);
            setImageUrl(url);
            setUploading(false);
          })
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(user.uid)
              .update({
                photos: firebase.firestore.FieldValue.arrayUnion(imageUrl),
              });
            console.log("uploaded");
            setUploading(false);
          });
      }
    );
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={{ color: "white" }}>Gallery</Text>
      {loading === false ? (
        <View>
          <Text style={{ color: "white" }}>Populating Data</Text>
          <ActivityIndicator size={"large"} color={"#000"} />
        </View>
      ) : (
        <>
          <View style={{ width: width, height: 500 }}>
            <SwiperFlatList
              onChangeIndex={(index) => onSelect(index)}
              autoplay={false}
              showPagination
              paginationActiveColor={"black"}
              data={userData.photos}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ width: width, justifyContent: "center" }}>
                    <Image
                      key={index}
                      source={{ uri: item }}
                      style={{
                        width: width,
                        height: 400,
                        resizeMode: "cover",
                        borderRadius: 14,
                      }}
                    />
                  </View>
                );
              }}
            />
          </View>
          {!image ? (
            <View style={{ flex: 1 / 2, marginTop: 30 }}>
              <Button title={"Post a photo"} onPress={imagePicker} />
            </View>
          ) : (
            <View style={{ flex: 1 / 2, marginTop: 30 }}>
              <Image
                source={{ uri: image }}
                style={{
                  width: 100,
                  height: 100,
                  justifyContent: "center",
                  alignSelf: "center",
                  marginBottom: 10,
                }}
              />
              {uploading ? (
                <ActivityIndicator size={"large"} color={"#000"} />
              ) : (
                <Text>Uploaded...</Text>
              )}
            </View>
          )}
        </>
      )}
    </View>
  );
}
