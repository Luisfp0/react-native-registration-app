import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
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

export default function SignUp({
  navigation,
}: NativeStackScreenProps<any, any>) {
  const [name, setName] = useState("");
  const nameParts = name.split(" ");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleName = (value: any) => {
    setName(value);
    setError("");
  };

  const handleEmail = (value: any) => {
    setEmail(value);
    setError("");
  };

  const handlePassword = (value: any) => {
    setPassword(value);
    setError("");
  };

  function validateEmail(email: any) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  }

  const isStrongPassword = (password: any) => {
    const errors = [];
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

  async function verifyUserExists(email: string | undefined) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email);
    console.log(data, error);

    if (data?.length) {
      return true;
    }
  }

  async function insertUser(email: string | undefined) {
    const { data, error } = await supabase
      .from("users")
      .insert([{ name, email, password }]);

      if (error) {
        return false;
      }
  }

  const createAccount = async () => {
    setError('')
    setLoading(true);
    const userExists = await verifyUserExists(email);
    if (userExists) {
      setError("Usuário já existe, faça login ou recupere sua senha.");
      setLoading(false);
      return;
    }

    const teste = insertUser(email)
    if(!teste) {
      setError('Erro ao criar a conta, tente novamente mais tarde.')
      setLoading(false);
      return;
    }

    if (nameParts.length <= 1) {
      setError("Por favor, digite seu nome completo.");
      setLoading(false);
      return;
    }

    const emailIsValid = validateEmail(email);
    if (emailIsValid === false) {
      setLoading(false);
      setError("E-mail inválido, por favor, digite um e-mail válido.");
      return;
    }

    const passwordErrors = isStrongPassword(password);
    if (passwordErrors) {
      setError(passwordErrors);
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      setError('')
      navigation.navigate("Profile");
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSignUp}>
        <Image
          style={styles.topImage}
          source={require("../../assets/images/teste.png")}
        />
        <Image
          style={styles.logo}
          source={require("../../assets/images/logo.png")}
        />
      </View>
      <KeyboardAwareScrollView
        style={styles.keyboardAware}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.footerSignUp}>
          <Text style={styles.textOne}>Cadastre-se</Text>
          <View style={styles.inputs}>
            <TextInputField
              onChange={handleName}
              placeholder={"Nome Completo"}
              leftIcon={<Entypo name="user" size={24} color="black" />}
            />
            <TextInputField
              onChange={handleEmail}
              placeholder={"Email"}
              leftIcon={<MaterialIcons name="email" size={24} color="black" />}
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
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={createAccount}
              >
                <View style={styles.buttonCreateAcount}>
                  <Text style={{ color: "white" }}>
                    {loading ? "Criando conta..." : "Criar conta"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  headerSignUp: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  textOne: {
    marginBottom: 20,
    fontSize: 25,
    color: "black",
  },
  footerSignUp: {
    marginTop: 40,
    width: "100%",
    alignItems: "center",
  },
  keyboardAware: {
    flex: 1,
    width: "100%",
  },
  inputs: {
    width: "90%",
  },
  buttonContainer: {
    marginTop: 20,
  },
  topImage: {
    width: "95%",
    height: 390,
    resizeMode: "contain",
  },
  logo: {
    position: "absolute",
    top: 80,
    width: 250,
    height: 150,
  },
  buttonCreateAcount: {
    height: 50,
    width: "100%",
    borderRadius: 50,
    backgroundColor: "#6B42F4",
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
});
