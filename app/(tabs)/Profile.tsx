import React, { useState } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { supabase } from "../../config/initSupabase";

export default function SignUp({
  navigation,
}: NativeStackScreenProps<any, any>) {
  return <View style={{ backgroundColor: "red" }}></View>;
}
