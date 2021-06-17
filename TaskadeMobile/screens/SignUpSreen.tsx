import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/core";
import { gql, useMutation } from "@apollo/client";




const SIGN_UP_MUTATION = gql`
  mutation signUp($name: String!, $email: String!, $password: String!) {
    signUp(input: { name: $name, email: $email, password: $password }) {
      user {
        name
        id
        email
      }
      token
    }
  }
`;

export default function SignupScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  //!mutation[0]:a function to trigger the mutation
  //!mutation[1]:result object
  //! {data, error, loading}
  const [signUp, { data, error, loading }] = useMutation(SIGN_UP_MUTATION);

  if (error) {
    Alert.alert("Error signin up. Try again");
  }

  if (data) {
    //save token
    AsyncStorage.setItem("token", data.signUp.token).then(() => {
      navigation.navigate("Home");
    });
  }

  const onSubmit = () => {
    signUp({ variables: { name, email, password } });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="#5c5c5c"
      />
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
      <Pressable
        onPress={onSubmit}
        style={{ ...styles.button, backgroundColor: "#d64b6e" }}
      >
        <Text style={styles.text}>Sign Up</Text>
      </Pressable>
      {loading && <ActivityIndicator />}
      <Pressable
        onPress={() => {
          navigation.navigate("SigninScreen");
        }}
        disabled={loading}
      >
        <Text style={{ ...styles.text, fontSize: 14, marginTop: 25 }}>
          Already have an account? Sign In
        </Text>
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
    borderRadius:5
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
