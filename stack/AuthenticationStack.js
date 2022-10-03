import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GettingStarted from "../screens/Auth/GettingStarted";
import Signup from "../screens/Auth/Signup";

const AuthStack = createNativeStackNavigator();

export default function AuthenticationStack() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="GettingStarted" component={GettingStarted} />
        <AuthStack.Screen name="Signup" component={Signup} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
