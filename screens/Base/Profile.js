import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import firebase from "../../config/firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";
import Button from "../../components/Button";
import ButtonSecondary from "../../components/ButtonSecondary";
const { width } = Dimensions.get("window");

export default function Profile({ navigation }) {
  const { user, userData, loading } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

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
    <View>
      <Text style={styles.headingText}>Update Your Profile</Text>
      <View
        style={{
          paddingTop: 40,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: userData?.photoURL }}
          style={{ width: 150, height: 150, borderRadius: 100 }}
        />
        <View
          style={{
            position: "absolute",
            right: 100,
            backgroundColor: "#f6697d",
            borderRadius: 100,
            borderWidth: 1,
            borderColor: "white",
            bottom: 50,
          }}
        >
          <AntDesign
            name="edit"
            size={24}
            color="white"
            style={{ padding: 5 }}
          />
        </View>
        <Text
          style={{
            marginTop: 10,
            fontSize: 20,
            fontWeight: "700",
            letterSpacing: 1,
            color: "#434854",
          }}
        >
          {userData?.displayName}
        </Text>
      </View>

      {/* <Button title={"Add Photos"} onPress={imagePicker} />
      <Button title={"Upload"} onPress={handleUpload} /> */}
      {!loading ? (
        <>
          <View
            style={{
              justifyContent: "center",
              marginTop: 30,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#434854", fontSize: 23, fontWeight: "700" }}>
              Gallery
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{}}
            >
              {userData?.photos.map((item, index) => (
                <Pressable onPress={() => navigation.navigate("Gallery")}>
                  <Image
                    source={{ uri: item }}
                    style={{
                      width: 100,
                      height: 100,
                      margin: 10,
                      borderRadius: 16,

                      borderWidth: 2,
                      borderColor: "#f6697d",
                    }}
                    key={item}
                  />
                </Pressable>
              ))}
            </ScrollView>
          </View>
          <View
            style={{
              justifyContent: "flex-start",
              marginTop: 30,
              width: width,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                paddingLeft: 10,
                alignItems: "center",
              }}
            >
              <FontAwesome5 name="user-circle" size={30} color="#788eec" />
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#434854",
                }}
              >
                Account Details
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                paddingLeft: 10,
                alignItems: "center",
                paddingTop: 5,
              }}
            >
              <Feather name="settings" size={30} color="gray" />
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#434854",
                }}
              >
                Settings
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 30,
              }}
            >
              <ButtonSecondary title={"Sign Out"} />
            </View>
          </View>
        </>
      ) : (
        <View>
          <Text>Loading...</Text>
        </View>
      )}
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
    justifyContent: "center",
    flex: 1,
  },
  headingText: {
    paddingTop: 50,
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
