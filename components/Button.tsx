import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

type ButtonProps = {
  onPress: () => void;
  label: string;
  disabled?: boolean;
};

export const Button = ({ onPress, label, disabled = false }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={{ ...styles.button, opacity: disabled ? 0.6 : 1 }}>
        <Text style={{ color: "white" }}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 50,
    backgroundColor: "#6B42F4",
    alignItems: "center",
    justifyContent: "center",
  },
});
