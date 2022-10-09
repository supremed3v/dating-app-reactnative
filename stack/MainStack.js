import React, { useContext } from "react";
import {
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GettingStarted from "../screens/Auth/GettingStarted";
import Signup from "../screens/Auth/Signup";
import Form from "../screens/Details/Form";
import { AuthContext } from "../context/AuthContext";
import SignIn from "../screens/Auth/SignIn";
import { Chat, HomeScreen, Liked, Profile } from "../screens/Base";
import Gallery from "../components/Gallery";

const MainStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const HomeStack = createBottomTabNavigator();
const Auth = ({ navigation }) => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="GettingStarted"
        component={GettingStarted}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Form"
        component={Form}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

const Home = ({ navigation }) => {
  return (
    <HomeStack.Navigator
      options={{}}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 60,
          shadowColor: "#000",
          elevation: 20,
        },
      }}
    >
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="cards"
              size={24}
              color={`${focused ? "#E94057" : "#ADAFBB"}`}
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="Liked"
        component={Liked}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="heart"
              size={24}
              color={`${focused ? "#E94057" : "#ADAFBB"}`}
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="chatbubble"
              size={24}
              color={`${focused ? "#E94057" : "#ADAFBB"}`}
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user"
              size={24}
              color={`${focused ? "#E94057" : "#ADAFBB"}`}
            />
          ),
        }}
      />
    </HomeStack.Navigator>
  );
};

export default function MainStackNavigator({ navigation }) {
  const { user } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName={user !== null ? "Home" : "Auth"}
        screenOptions={{ headerShown: false }}
      >
        <MainStack.Screen name="Auth" component={Auth} />
        <MainStack.Screen name="Home" component={Home} />
        <MainStack.Screen name="Gallery" component={Gallery} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
