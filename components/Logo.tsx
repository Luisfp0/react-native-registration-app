import { StyleSheet, Image, View } from "react-native";
import React from "react";

export const Logo = () => {
  return (
    <View style={styles.logoContainer}>
      <Image
        style={styles.logoBackground}
        source={require("../assets/images/teste.png")}
      />
      <Image
        style={styles.logo}
        source={require("../assets/images/logo.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  logoBackground: {
    width: "95%",
    height: 250,
    resizeMode: "contain",
  },
  logo: {
    position: "absolute",
    top: 40,
    width: 150,
    height: 95,
  },
});
