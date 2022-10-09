import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import firebase from "../../config/firebaseConfig";
import Button from "../../components/Button";
import * as ImagePicker from "expo-image-picker";

export default function Profile({ navigation }) {
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  // console.log(profileData);

  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      console.log(image);
    }
  };

  const handleDelete = (uri) => {
    let newImage = image.filter((img) => img.uri !== uri);
    setImage(newImage);
    console.log("pressed");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Update Your Profile</Text>

      <FlatList
        data={image}
        renderItem={({ item }) => (
          <>
            <Image
              source={{ uri: item.uri }}
              style={{ width: 100, height: 100, margin: 10 }}
            />
            <Pressable onPress={() => handleDelete(item.uri)}>
              <Text>Delete</Text>
            </Pressable>
          </>
        )}
        horizontal={true}
        keyExtractor={(item) => item.uri}
      />
      {/* <Button title={"Add Photos"} onPress={imagePicker} />
      <Button title={"Upload"} onPress={handleUpload} /> */}
      <Button
        title={"Gallery"}
        onPress={() => navigation.navigate("Gallery")}
      />
    </View>
  );
}

{
  /* {Object.keys(profileData).length === 0 ? (
        <ActivityIndicator color="black" size={"large"} />
      ) : (
        <View style={{ marginTop: 30, marginVertical: 30 }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 20,
            }}
          >
            <Image
              source={{ uri: profileData.photoURL }}
              style={{ width: 150, height: 150, borderRadius: 40 }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              paddingBottom: 5,
            }}
          >
            <Text style={styles.userName}>Your Name:</Text>
            <TextInput
              style={styles.userInput}
              value={profileData.displayName}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 40,
            }}
          ></View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 40,
              paddingTop: 5,
            }}
          >
            <Text style={styles.userName}>Your bio:</Text>
            <TextInput
              style={[styles.userInput, { marginLeft: 42 }]}
              value={profileData.description}
            />
          </View>
          <Text>{profileData.sexInterest}</Text>
          <View>
            {profileData.hobbies.map((hobby) => (
              <Text>{hobby}</Text>
            ))}
          </View>
        </View>
      )} */
}
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    justifyContent: "center",
  },
  headingText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  userName: {
    textAlign: "center",
    fontSize: 20,
  },
  userInput: {
    paddingVertical: 5,
    width: 200,
    textAlign: "center",
    fontSize: 20,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    backgroundColor: "white",
  },
});
