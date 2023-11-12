import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useUser } from "./UserContext";
import { supabase } from "../../config/initSupabase";

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useUser();

  useEffect(() => {}, []);
  async function verifyUserExists(email: string | undefined) {
    const { data } = await supabase
      .from("users")
      .select("name")
      .eq("email", email);

    if (data?.length) {
      return data[0];
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 70,
          width: "100%",
          marginTop: 50,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Meu Perfil</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>VOLTAR !!</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#color.background",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.4,
          shadowRadius: 12.35,
          elevation: 5,
        }}
      >
        <Text>Nome: {user ? user.name : "Desconhecido"}</Text>
        <Text>Email: {user ? user.email : "Desconhecido"}</Text>
        <Text>Senha: {user ? user.password : "Desconhecido"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientContainer: {
    height: "100%",
    width: "100%",
  },
  headerContainer: {
    height: 70,
    width: "100%",
    justifyContent: "space-between",
    marginTop: 50,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    color: "white",
  },
  profileContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "$color.background",
    borderRadius: 11,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 12.35,
    elevation: 5,
    marginTop: 15,
    alignItems: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 15,
  },
  infoContainer: {
    width: "100%",
    marginTop: 15,
    alignItems: "center",
    paddingHorizontal: 15,
  },
});

export default ProfileScreen;
