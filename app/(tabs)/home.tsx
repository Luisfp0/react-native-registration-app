import { Button, Image, Pressable, StyleSheet, StatusBar } from "react-native";
import { Text, View } from "../../components/Themed";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";

export default function Home({ navigation }: NativeStackScreenProps<any, any>) {
  useEffect(() => {
    StatusBar.setBarStyle("light-content");
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/coding.gif")}
          style={styles.image}
          resizeMode="cover"
        ></Image>
      </View>
      <View style={styles.footer}>
        <View style={styles.containerWelcomeText}>
          <Text style={{ fontSize: 25 }}>Olá, seja bem vindo</Text>
          <Text>Faça login ou crie sua conta.</Text>
        </View>
        <View style={styles.containerButton}>
          <Pressable
            style={styles.buttonOne}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text>Login</Text>
          </Pressable>
          <Pressable
            style={styles.buttonTwo}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text>Cadastre-se</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 2,
  },
  image: {
    height: "100%",
  },
  footer: {
    flex: 1,
    position: "absolute",
    gap: 60,
    bottom: 0,
    height: 250,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    width: "100%",
    backgroundColor: "#171B2E",
  },
  containerButton: {
    flexDirection: "row",
    backgroundColor: "#171B2E",
    width: "100%",
    justifyContent: "space-around",
  },
  buttonOne: {
    height: 50,
    width: 160,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1b2657",
  },
  buttonTwo: {
    height: 50,
    width: 160,
    borderRadius: 50,
    backgroundColor: "#6B42F4",
    alignItems: "center",
    justifyContent: "center",
  },
  containerWelcomeText: {
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "transparent",
  },
});
