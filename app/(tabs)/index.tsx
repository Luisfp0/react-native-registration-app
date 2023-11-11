import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ActivityIndicator,
  ImageBackground,
  Image,
} from "react-native";
import { router } from "expo-router";

export default function TabOneScreen() {
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

  const createAccount = () => {
    setLoading(true);

    if (nameParts.length <= 1) {
      setError("Por favor, digite seu nome completo.");
      setLoading(false);
      return;
    }

    const emailIsValid = validateEmail(email);
    if (emailIsValid === false) {
      setLoading(false);
      setError("E-mail invalido, por favor digite um e-mail valido.");
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
      router.replace("/two");
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
      <View style={styles.footerSignUp}>
        <Text style={styles.textOne}>Cadastre-se</Text>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={handleName}
            placeholder="Nome Completo"
          />
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            value={email}
            onChangeText={handleEmail}
            placeholder="E-mail"
          />
          <TextInput
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={handlePassword}
            placeholder="Senha"
            autoCapitalize="none"
          />
        </View>
        <Text>{error}</Text>
        <View style={styles.buttonContainer}>
          <Button
            onPress={createAccount}
            disabled={loading}
            title={loading ? "" : "Registrar"}
          />
          {loading && <ActivityIndicator />}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: '100%'
  },
  headerSignUp: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  textOne: {
    marginBottom: 20,
    fontSize: 20,
    color: "black",
  },
  footerSignUp: {
    flex: 1,
    marginTop: 40,
    width: '90%',
    alignItems: 'center',
  },
  inputs: {
    width: "100%",
  },
  input: {
    height: 50,
    backgroundColor: 'gray',
    borderRadius: 50,
    marginBottom: 10,
    paddingLeft: 10,
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
});
