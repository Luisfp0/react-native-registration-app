import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import PasswordInput from "../../components/PasswordInput";
import {
  Entypo,
  Foundation,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import TextInputField from "../../components/TextInputField";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { supabase } from "../../config/initSupabase";
import { Logo } from "../../components/Logo";
import { Button } from "../../components/Button";
import { RootStackParamList } from "../../navigation/types";
import { validateEmail } from "../../utils/email";
import { useUser } from "./UserContext";

export default function SignUp({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "SignUp">) {
  const scrollRef = useRef<JSX.Element>();
  const [name, setName] = useState("");
  const nameParts = name.split(" ");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useUser();

  const handleName = useCallback(
    (value: string) => {
      setName(value);
      setError("");
    },
    [setName, setError]
  );

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

  const isStrongPassword = (password: string) => {
    const errors: string[] = [];
    const minLength = 8;
    const hasNumber = /\d/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);

    if (password.length < minLength) {
      errors.push("A senha deve ter pelo menos 8 caracteres.");
    }

    if (!hasNumber) {
      errors.push("A senha deve conter pelo menos um número.");
    }

    if (!hasUpperCase) {
      errors.push("A senha deve conter pelo menos uma letra maiúscula.");
    }

    if (!hasLowerCase) {
      errors.push("A senha deve conter pelo menos uma letra minúscula.");
    }

    if (!hasSpecialChar) {
      errors.push("A senha deve conter pelo menos um caractere especial.");
    }

    if (errors.length > 0) {
      return errors[0];
    }
  };

  async function insertUser(email: string | undefined) {
    const { data, error } = await supabase
      .from("users")
      .insert([{ name, email, password }]);

    if (error?.code === "23505") {
      setError("Usuário já existe, faça login ou recupere sua senha.");
      return false;
    }
  }

  const createAccount = useCallback(async () => {
    setError("");
    setLoading(true);

    if (nameParts.length <= 1) {
      console.log(nameParts);
      setError("Por favor, digite seu nome completo.");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setLoading(false);
      setError("E-mail inválido, por favor, digite um e-mail válido.");
      return;
    }

    const passwordError = isStrongPassword(password);
    if (passwordError) {
      setError(passwordError);
      setLoading(false);
      return;
    }

    if (!(await insertUser(email))) {
      setLoading(false);
      return;
    }

    setTimeout(() => {
      login({ name: name, email: email, password: password });
      setLoading(false);
      setError("");
      navigation.navigate("Profile");
    }, 2000);
  }, []);

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
              <Text style={styles.title}>Cadastre-se</Text>
              <TextInputField
                onChange={handleName}
                value={name}
                placeholder={"Nome Completo"}
                leftIcon={<Entypo name="user" size={24} color="black" />}
              />
              <TextInputField
                onChange={handleEmail}
                placeholder={"Email"}
                value={email}
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
                disabled={loading}
                onPress={createAccount}
                label={loading ? "Criando conta..." : "Criar conta"}
              ></Button>
            </View>
            <Text style={{ textAlign: "center", marginTop: 5 }}>
              Já tem uma conta ?{" "}
              <Text
                style={{ color: "blue" }}
                onPress={() => navigation.navigate("SignIn")}
              >
                Faça o login
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
