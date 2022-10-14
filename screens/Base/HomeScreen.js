import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { Transitioning, Transition } from "react-native-reanimated";
import firebase from "../../config/firebaseConfig";
import data from "../../data/DATA";
import { AuthContext } from "../../context/AuthContext";
import Swiper from "react-native-deck-swiper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "@react-native-community/blur";
const colors = {
  red: "#E94057",
  blue: "#0070FF",
  gray: "#777777",
  white: "#ffffff",
  black: "#000000",
  orange: "#F27121",
};

const ANIMATION_DURATION = 200;

const transition = (
  <Transition.Sequence>
    <Transition.Out
      type="slide-bottom"
      durationMs={ANIMATION_DURATION}
      interpolation="easeIn"
    />
    <Transition.Together>
      <Transition.In
        type="fade"
        durationMs={ANIMATION_DURATION}
        delayMs={ANIMATION_DURATION / 2}
      />
      <Transition.In
        type="slide-bottom"
        durationMs={ANIMATION_DURATION}
        delayMs={ANIMATION_DURATION / 2}
        interpolation="easeOut"
      />
    </Transition.Together>
  </Transition.Sequence>
);

const swiperRef = React.createRef();
const transitionRef = React.createRef();

const Card = ({ card }) => {
  return (
    <View
      style={{
        flex: 0.65,
        borderColor: "grey",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ImageBackground
        source={{ uri: card.photos[0] }}
        style={{
          justifyContent: "center",
          height: 350,
          width: 300,
          marginTop: 30,
        }}
        imageStyle={{ borderRadius: 20 }}
        resizeMode="cover"
      >
        <View
          key={card.id}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <Transitioning.View
            ref={transitionRef}
            transition={transition}
            style={styles.bottomContainerMeta}
          >
            <Text
              style={[
                styles.text,
                styles.heading,
                { marginLeft: 20, paddingRight: 20 },
              ]}
              numberOfLines={2}
            >
              {card.displayName},
            </Text>
            <Text style={[styles.text, styles.price]}>{card.age}</Text>
          </Transitioning.View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default function HomeScreen({ navigation }) {
  const { user, userData } = useContext(AuthContext);
  const [swipeRight, setSwipeRight] = useState([]);
  const [index, setIndex] = React.useState(0);
  const addLiked = (item) => {
    setSwipeRight((prev) => [...prev, item]);
  };
  console.log(swipeRight);
  const onSwiped = () => {
    transitionRef.current.animateNextTransition();
    setIndex((index + 1) % data.length);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 40,
          position: "absolute",
          top: 40,
          left: 0,
          right: 0,
          zIndex: 1,
          fontWeight: "600",
        }}
      >
        Discover
      </Text>
      <View style={{ flex: 0.65, marginTop: 40 }}>
        <Swiper
          backgroundColor="#fefefe"
          ref={swiperRef}
          cards={data}
          cardIndex={index}
          renderCard={(card) => <Card card={card} />}
          onSwiper={onSwiped}
          stackSize={4}
          stackScale={10}
          stackSeparation={14}
          disableTopSwipe
          disableBottomSwipe
          onSwipedRight={(cardIndex) => addLiked(data[cardIndex])}
          onSwipedLeft={() => {}}
          onSwipedAll={() => <Text>That's for today...</Text>}
          on
          animateOverlayLabelsOpacity
          animateCardOpacity
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  backgroundColor: "red",
                  color: "white",
                  fontSize: 24,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  marginTop: 20,
                  marginLeft: -20,
                },
              },
            },
            right: {
              title: "LIKE",
              style: {
                label: {
                  backgroundColor: "green",
                  color: "white",
                  fontSize: 24,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginTop: 20,
                  marginLeft: 20,
                },
              },
            },
          }}
        />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomContainerButtons}>
          <MaterialCommunityIcons.Button
            name="close"
            size={94}
            backgroundColor="transparent"
            underlayColor="transparent"
            activeOpacity={0.3}
            color={colors.orange}
            onPress={() => swiperRef.current.swipeLeft()}
          />
          <MaterialCommunityIcons.Button
            name="heart-circle"
            size={94}
            backgroundColor="transparent"
            underlayColor="transparent"
            activeOpacity={0.3}
            color={colors.red}
            onPress={() => swiperRef.current.swipeRight()}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  swiperContainer: {
    flex: 0.65,
  },
  bottomContainer: {
    flex: 0.35,
    justifyContent: "space-evenly",
  },
  bottomContainerMeta: {
    alignContent: "flex-end",
    backgroundColor: "black",
    alignItems: "baseline",
    position: "absolute",
    flexDirection: "row",
    bottom: -175,
    left: 0,
    width: 300,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    opacity: 0.7,
  },
  bottomContainerButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 30,
  },
  cardImage: {
    width: 160,
    flex: 1,
    resizeMode: "contain",
  },
  card: {
    flex: 0.45,
    borderRadius: 8,
    shadowRadius: 25,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  text: {
    textAlign: "left",
    fontSize: 50,
    backgroundColor: "transparent",
  },
  done: {
    textAlign: "left",
    fontSize: 30,
    color: colors.white,
    backgroundColor: "transparent",
  },
  heading: {
    fontSize: 32,
    marginBottom: 10,
    color: colors.white,
    textAlign: "left",
  },
  price: {
    color: colors.white,
    fontSize: 32,
    fontWeight: "500",
    textAlign: "left",
  },
});
