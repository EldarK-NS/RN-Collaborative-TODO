/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName, StyleSheet, Pressable } from "react-native";

import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import ProjectsScreen from "./../screens/ProjectsScreen";
import ToDoScreen, {
  screenOptions as headerButtonTodoScreen,
} from "./../screens/ToDoScreen";
import SigninScreen from "../screens/SignInScreen";
import SignupSreen from "../screens/SignUpSreen";
import SplashScreen from "./../screens/SplashScreen";

import CreateTodo from "../components/CreateTodo";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SigninScreen"
        component={SigninScreen}
        options={{
          title: "Sign In",
        }}
      />
      <Stack.Screen
        name="SignupScreen"
        component={SignupSreen}
        options={{
          title: "Sign Up",
        }}
      />
      <Stack.Screen name="Home" component={ProjectsScreen} />
      <Stack.Screen
        name="TodoScreen"
        component={ToDoScreen}
        options={headerButtonTodoScreen}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}
