import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";
import Button from "../../components/Button";

export default function GettingStarted({ navigation }) {
  const onSignUp = () => {
    navigation.navigate("Signup");
  };
  return (
    <>
      <View style={styles.container}>
        <Swiper
          style={styles.wrapper}
          dot={
            <View
              style={{
                backgroundColor: "rgba(0,0,0,.2)",
                width: 7,
                height: 7,
                borderRadius: 7,
                marginLeft: 7,
                marginRight: 7,
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: "#E94057",
                width: 13,
                height: 13,
                borderRadius: 7,
                marginLeft: 7,
                marginRight: 7,
              }}
            />
          }
          paginationStyle={{
            bottom: 200,
          }}
          autoplay={true}
          autoplayTimeout={3}
        >
          <View style={styles.slide}>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={{
                uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
              }}
            />
            <Text style={styles.headerText}>Algorithm</Text>
            <Text style={styles.secondaryText}>
              Users going through a vetting process to ensure you never match
              with bots
            </Text>
          </View>
          <View style={styles.slide}>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={{
                uri: "https://images.unsplash.com/photo-1564485377539-4af72d1f6a2f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG1vZGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
              }}
            />
            <Text style={styles.headerText}>Matches</Text>
            <Text style={styles.secondaryText}>
              We match you with people that have a large array of similar
              interests.
            </Text>
          </View>
          <View style={styles.slide}>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={{
                uri: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bW9kZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
              }}
            />
            <Text style={styles.headerText}>Premium</Text>
            <Text style={styles.secondaryText}>
              Sign up today and enjoy the first month of premium benefits on us.
            </Text>
          </View>
        </Swiper>
        <View style={{ position: "absolute", bottom: 100 }}>
          <Button title="Get Started!" onPress={onSignUp} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -200,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    paddingTop: 30,
    fontSize: 30,
    fontWeight: "bold",
    color: "#f6697d",
  },
  secondaryText: {
    color: "#323d55",
    fontSize: 16,
    width: 300,
    textAlign: "center",
    marginTop: 20,
  },
  wrapper: {
    height: 700,
  },

  image: {
    width: 250,
    height: 350,
    borderRadius: 30,
  },
});
