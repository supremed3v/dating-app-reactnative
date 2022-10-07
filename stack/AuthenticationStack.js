import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GettingStarted from "../screens/Auth/GettingStarted";
import Signup from "../screens/Auth/Signup";
import Form from "../screens/Details/Form";

const AuthStack = createNativeStackNavigator();

export default function AuthenticationStack() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator
        initialRouteName="Form"
        screenOptions={{ headerShown: false }}
      >
        <AuthStack.Screen name="GettingStarted" component={GettingStarted} />
        <AuthStack.Screen name="Signup" component={Signup} />
        <AuthStack.Screen name="Form" component={Form} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
