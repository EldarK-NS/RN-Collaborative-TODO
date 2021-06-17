import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { gql, useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SIGN_IN_MUTATION = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      user {
        id
        name
        email
        avatar
      }
      token
    }
  }
`;

export default function SigninScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signIn, { data, error, loading }] = useMutation(SIGN_IN_MUTATION);

  //   console.log(data);

  useEffect(() => {
    if (error) {
      Alert.alert("Invalid credentials, try again");
    }
  }, [error]);

  if (data) {
    //remove token
    AsyncStorage.setItem("token", data.signIn.token).then(() => {
      navigation.navigate("Home");
    });
  }

  const onSubmit = () => {
    signIn({ variables: { email, password } });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#5c5c5c"
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        placeholderTextColor="#5c5c5c"
      />
      <Pressable onPress={onSubmit} style={styles.button} disabled={loading}>
        <Text style={styles.text}>Sign In</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("SignupScreen")}
        style={{ ...styles.button, backgroundColor: "#d64b6e" }}
      >
        <Text style={styles.text}>Sign Up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    color: "white",
    width: "100%",
    fontSize: 18,
    marginVertical: 20,
    borderColor: "white",
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "orange",
    height: 50,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    width: "100%",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,
  },
});
