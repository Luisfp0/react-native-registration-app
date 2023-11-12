import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useUser } from "./UserContext";
import { supabase } from "../../config/initSupabase";
import { RootStackParamList } from "../../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "../../components/Button";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Profile">) => {
  const { user, logout } = useUser();
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState(
    "http://placekitten.com/215/230"
  );

  useEffect(() => {
    const fetchData = async () => {
      const userName = await verifyUserExists(user?.email);
      setName(userName?.name);
    };

    fetchData();
  }, []);

  async function verifyUserExists(email: string | undefined) {
    const { data } = await supabase
      .from("users")
      .select("name")
      .eq("email", email);

    if (data?.length) {
      return data[0];
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (result.assets[0]) {
        setProfileImage(result.assets[0].uri);
        uploadImage(result.assets[0].uri);
      }
    }
  };

  const uploadImage = async (uri: string) => {
    try {
      const { data, error } = await supabase.storage
        .from("ProfileImage")
        .upload("ProfileImage", uri, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Error uploading image:", error);
      } else {
        console.log("Image uploaded successfully:", data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const deleteAccount = () => {
    Alert.alert(
      "Excluir Conta",
      "Tem certeza de que deseja excluir sua conta?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: async () => {
            await supabase.from("users").delete().eq("email", user?.email);
            logout();
            navigation.navigate("SignUp");
          },
        },
      ]
    );
  };

  function exit() {
    logout();
    navigation.navigate("SignUp");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text></Text>
        <Text style={styles.textHeader}>Meu Perfil</Text>
        <TouchableOpacity onPress={exit} style={styles.logOffIcon}>
          <MaterialCommunityIcons name="logout" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <View style={styles.shapeImage}>
            <Image style={styles.profileImage} source={{ uri: profileImage }} />
          </View>
          <TouchableOpacity style={styles.switchImage} onPress={pickImage}>
            <Entypo name="camera" size={25} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.userData}>
          <Text style={styles.userDataLabel}>Nome completo:</Text>
          <Text>{name}</Text>
          <View style={styles.separator}></View>
        </View>
        <View style={styles.userData}>
          <Text style={styles.userDataLabel}>Email:</Text>
          <Text>{user?.email}</Text>
          <View style={styles.separator}></View>
        </View>
        <View style={styles.userData}>
          <Text style={styles.userDataLabel}>Senha:</Text>
          <Text>{user?.password}</Text>
          <View style={styles.separator}></View>
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={deleteAccount}
          >
            <View style={styles.button}>
              <Text style={{ color: "white" }}>Excluir conta</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6B42F4",
  },
  header: {
    height: 50,
    width: "100%",
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  textHeader: {
    fontSize: 20,
    color: "white",
  },
  logOffIcon: {
    marginRight: -20,
    marginLeft: 20,
  },
  profileContainer: {
    backgroundColor: "white",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  userData: {
    width: "100%",
    marginTop: 30,
  },
  userDataLabel: {
    fontWeight: "700",
  },
  separator: {
    borderBottomWidth: 0.2,
    paddingTop: 4,
    opacity: 0.3,
  },
  inputShow: {
    marginTop: 50,
    width: "70%",
    height: 50,
    borderWidth: 1,
  },
  containerButton: {
    marginTop: 40,
    gap: 15,
  },
  imageContainer: {
    width: "100%",
    height: 250,
    alignItems: "center",
    justifyContent: "center",
  },
  shapeImage: {
    width: 210,
    height: 210,
    borderWidth: 2,
    borderColor: "#6B42F4",
    borderRadius: 150,
    overflow: "hidden",
  },
  switchImage: {
    right: 80,
    top: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 150,
    width: 60,
    height: 60,
    backgroundColor: "#6B42F4",
    position: "absolute",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    width: "100%",
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 50,
    backgroundColor: "#F04747",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileScreen;
