import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "../app/(tabs)/SignUp";
import SignIn from "../app/(tabs)/SignIn";
import Profile from "../app/(tabs)/Profile";
import { RootStackParamList } from "./types";
import { UserProvider } from "../app/(tabs)/UserContext";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <UserProvider>
        <Stack.Navigator initialRouteName="SignUp">
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </UserProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
