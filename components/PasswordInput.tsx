import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

export default function PasswordInput({
  placeholder,
  onChange,
  leftIcon,
  rightIconShow,
  rightIconHide,
}) {
  const [showPassword, setShowPassword] = useState(false);
  console.log(showPassword);

  return (
    <View style={styles.container}>
      {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
      <TextInput
        style={styles.textInput}
        secureTextEntry={!showPassword}
        placeholder={placeholder}
        onChangeText={(text) => onChange(text)}
        placeholderTextColor="#718096"
      />
      <TouchableOpacity
        onPress={() => setShowPassword(!showPassword)}
        style={styles.rightIconContainer}
      >
        {showPassword ? rightIconShow : rightIconHide}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    alignItems: "center",
  },
  leftIconContainer: {
    position: "absolute",
    left: 20,
    bottom: 25,
    alignItems: "center",
    zIndex: 1,
  },
  rightIconContainer: {
    position: "absolute",
    right: 25,
    top: 15,
  },
  textInput: {
    height: 50,
    backgroundColor: "#f7f7f7",
    borderRadius: 50,
    marginBottom: 10,
    paddingLeft: 45,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    width: "100%",
  },
});
