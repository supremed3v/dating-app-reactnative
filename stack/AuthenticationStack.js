import React, { useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GettingStarted from "../screens/Auth/GettingStarted";
import Signup from "../screens/Auth/Signup";
import Form from "../screens/Details/Form";
import HomeScreen from "../screens/Base/HomeScreen";
import { AuthContext } from "../context/AuthContext";
import SignIn from "../screens/Auth/SignIn";

const MainStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const Auth = () => {
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

const Home = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

export default function MainStackNavigator() {
  const { user } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName={user !== null ? "Home" : "Auth"}
        screenOptions={{ headerShown: false }}
      >
        <MainStack.Screen name="Auth" component={Auth} />
        <MainStack.Screen name="Home" component={Home} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
