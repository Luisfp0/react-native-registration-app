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
import * as ImagePicker from "expo-image-picker";
import { verifyUserEmail } from "../../utils/supa";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const FALLBACK_IMAGE = "http://placekitten.com/215/230";
const IMAGE_BASE_URL =
  "https://uylqvgibghcxaotkckfd.supabase.co/storage/v1/object/public/ProfileImage/";

const ProfileScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Profile">) => {
  const { user, logout } = useUser();
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [profileImage, setProfileImage] = useState(
    `${IMAGE_BASE_URL}${imageUrl}`
  );
  
  useEffect(() => {
    const fetchData = async () => {
      if (user?.email) {
        const _user = await verifyUserEmail(user.email);
        setName(_user?.name);
        setImageUrl(_user?.image_url);
        setProfileImage(`${IMAGE_BASE_URL}${_user?.image_url}`);
      }
    };

    fetchData();
  }, []);

  const onSelectImage = async () => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    };

    const result = await ImagePicker.launchImageLibraryAsync(options);
    if (!result.canceled) {
      if (result.assets[0]) {
        setProfileImage(result.assets[0].uri);
      }
    }

    if (!result.canceled) {
      const img = result.assets[0];
      if (img) {
        setProfileImage(img.uri);
      }
      const base64 = await FileSystem.readAsStringAsync(img.uri, {
        encoding: "base64",
      });
      const filePath = `/public/${uuidv4()}.jpeg`;
      const contentType = "image/jpeg";
      await supabase.storage
        .from("ProfileImage")
        .upload(filePath, decode(base64), {
          contentType,
          cacheControl: "3600",
          upsert: true,
        });
      await supabase
        .from("users")
        .update({ image_url: filePath })
        .eq("email", user?.email);

      setImageUrl(`${IMAGE_BASE_URL}${filePath}`);
    }
  };

  const removeImage = async () => {
    const filePath = `public/${user?.email}.jpeg`;
    return await supabase.storage.from("ProfileImage").remove([filePath]);
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
            await removeImage();
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
            <Image
              style={styles.profileImage}
              source={{ uri: profileImage }}
              onError={() => setProfileImage(FALLBACK_IMAGE)}
            />
          </View>
          <TouchableOpacity style={styles.switchImage} onPress={onSelectImage}>
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
    borderWidth: 3,
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
