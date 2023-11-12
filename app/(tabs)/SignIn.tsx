import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import PasswordInput from "../../components/PasswordInput";
import { Foundation, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import TextInputField from "../../components/TextInputField";
import { supabase } from "../../config/initSupabase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Logo } from "../../components/Logo";
import { Button } from "../../components/Button";
import { RootStackParamList } from "../../navigation/types";
import { validateEmail } from "../../utils/email";

export default function SignIn({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "SignIn">) {
  const scrollRef = useRef<JSX.Element>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmail = useCallback(
    (value: string) => {
      setEmail(value);
      setError("");
    },
    [setEmail, setError]
  );

  const handlePassword = useCallback(
    (value: string) => {
      setPassword(value);
      setError("");
    },
    [setPassword, setError]
  );

  const verifyUserExists = useCallback(
    async (email: string, password: string) => {
      const { data } = await supabase
        .from("users")
        .select("email, password")
        .eq("email", email.toLowerCase())
        .eq("password", password)
        .single();

      return data;
    },
    []
  );

  const signIn = async () => {
    setLoading(true);

    if (!validateEmail(email)) {
      setLoading(false);
      setError("E-mail inválido, por favor, digite um e-mail válido.");
      return;
    }

    const user = await verifyUserExists(email, password);
    if (user) {
      if (user.password !== password) {
        setLoading(false);
        setError("E-mail ou senha incorretos.");
        return;
      }
    } else {
      setLoading(false);
      setError(
        "E-mail/senha incorretos, ou o Usuário não existe, verifique os dados ou crie uma conta."
      );
      return;
    }

    setTimeout(() => {
      setLoading(false);
      setError("");
      navigation.navigate("Profile");
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          innerRef={(ref) => {
            scrollRef.current = ref;
          }}
          style={styles.keyboardAware}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            <Logo />
            <View style={styles.formSignUp}>
              <Text style={styles.title}>Login</Text>
              <TextInputField
                value={email}
                onChange={handleEmail}
                placeholder={"Email"}
                leftIcon={
                  <MaterialIcons name="email" size={24} color="black" />
                }
              />
              <PasswordInput
                placeholder="Senha"
                onChange={handlePassword}
                leftIcon={<Foundation name="lock" size={24} color="black" />}
                rightIconHide={<Ionicons name="eye" size={24} color="black" />}
                rightIconShow={
                  <Ionicons name="eye-off" size={24} color="black" />
                }
              />
              <Text style={styles.errorText}>{error}</Text>
              <Button
                onPress={signIn}
                label={loading ? "Fazendo login..." : "Login"}
              ></Button>
            </View>
            <Text style={{ textAlign: "center", marginTop: 5 }}>
              Ainda não tem uma conta ?{" "}
              <Text
                style={{ color: "blue" }}
                onPress={() => navigation.navigate("SignUp")}
              >
                Cadastre-se
              </Text>
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "white",
  },
  awareScrollViewContent: {
    flex: 1,
    backgroundColor: "red",
  },
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    padding: 10,
  },
  title: {
    marginBottom: 10,
    fontSize: 25,
    color: "black",
  },
  formSignUp: {
    alignItems: "center",
    marginHorizontal: 20,
  },
  keyboardAware: {
    width: "100%",
  },
  formContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  inputs: {
    width: "90%",
  },
  errorText: {
    flexWrap: "wrap",
    height: 40,
    width: "100%",
    marginBottom: 5,
    color: "red",
    textAlign: "center",
  },
});
