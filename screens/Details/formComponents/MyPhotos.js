import { View, Text, Pressable, Image, FlatList } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
export default function MyPhotos() {
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 5,
    });
    console.log(result);
    if (!result.cancelled) {
      setImages(result.uri ? [result.uri] : result.selected);
    }
  };
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
      }}
    >
      <Pressable
        onPress={pickImage}
        style={{
          width: 250,
          backgroundColor: "#FFF",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          borderRadius: 15,
          borderWidth: 1,
          borderColor: "#f3f3f3",

          elevation: 40,
          shadowColor: "#f6697d",
        }}
      >
        <Entypo name="camera" size={24} color="#f6697d" style={{ left: -20 }} />
        <Text
          style={{
            fontSize: 16,
            paddingVertical: 17,
            color: "#f6697d",
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          Upload Photos
        </Text>
      </Pressable>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          marginHorizontal: 30,
          marginTop: 20,
        }}
      >
        {images && images.length > 0 ? (
          images.map((image) => (
            <View style={{ marginLeft: 10, marginTop: 10 }}>
              <Image
                key={image.id}
                source={{ uri: image.uri }}
                style={{ width: 140, height: 140, borderRadius: 10 }}
              />
            </View>
          ))
        ) : (
          <Text>Upload Photos</Text>
        )}
      </View>
    </View>
  );
}
