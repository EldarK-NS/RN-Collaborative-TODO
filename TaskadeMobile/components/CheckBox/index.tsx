import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface CheckBoxProps {
  isChecked: boolean;
  onPress: () => void;
}
export default function CheckBox(props: CheckBoxProps) {
const{onPress}=props

  const name = props.isChecked
    ? "checkbox-marked-outline"
    : "checkbox-blank-outline";
  return (
    <Pressable onPress={onPress}>
      <MaterialCommunityIcons name={name} size={30} color="#75746e" />
    </Pressable>
  );
}

const styles = StyleSheet.create({});
