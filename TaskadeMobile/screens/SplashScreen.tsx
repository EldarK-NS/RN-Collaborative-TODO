import React, { useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const checkUser = async () => {
      if (await isAuthenticated()) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("SigninScreen");
      }
    };
    checkUser();
  }, []);

  const isAuthenticated = async () => {
   // AsyncStorage.removeItem("token");
    const token = await AsyncStorage.getItem("token");
    return !!token;
  };

  return (
    <View>
      <ActivityIndicator color="white" size="large" />
    </View>
  );
}

const styles = StyleSheet.create({});
