import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "../navigation/AppNavigator";

export const Main = () => {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
};
