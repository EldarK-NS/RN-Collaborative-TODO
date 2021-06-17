import React from "react";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import { ProgressBar } from "@react-native-community/progress-bar-android";
import { Fontisto } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface TaskListItemProps {
  project: {
    id: string;
    title: string;
    createdAt: string;
    todos: [];
  };
}

export default function TaskListItem({ project }: TaskListItemProps) {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("TodoScreen", { id: project.id, project });
  };

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Pressable style={styles.leftSide} onPress={onPress}>
          <Ionicons
            name="document-text-outline"
            size={45}
            color="#a6a6a1"
            style={styles.mainIcon}
          />
        </Pressable>
        <View style={styles.rightSide}>
          <View style={styles.rightSideUp}>
            <Text style={styles.title}>{project.title}</Text>
            <Text style={styles.time}>{project.createdAt}</Text>
            {/* <View style={styles.progressBar}>
            <Text>Colored Progress Indicator</Text>
            <ProgressBar styleAttr="Horizontal" color="#2196F3" />
          </View> */}
          </View>
          <View style={styles.rightSideDown}>
            <View style={styles.info}>
              <Fontisto name="date" size={14} color="#a6a6a1" />
              <Text style={styles.infoText}>Date</Text>
            </View>
            <View style={styles.info}>
              <Ionicons name="md-person-outline" size={14} color="#a6a6a1" />
              <Text style={styles.infoText}>Assign</Text>
            </View>
            <View style={styles.info}>
              <MaterialCommunityIcons
                name="tag-outline"
                size={14}
                color="#a6a6a1"
              />
              <Text style={styles.infoText}>Tag</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.line}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    marginVertical: 5,
  },
  line: {
    width: Dimensions.get("window").width * 0.8,
    height: 2,
    backgroundColor: "#292525",
    //  marginVertical: 2,
    marginLeft: 85,
  },
  container: {
    flexDirection: "row",
    width: "100%",
    marginLeft: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  leftSide: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#a6a6a1",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#262525",
  },
  mainIcon: {
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  rightSide: {
    flexDirection: "column",
    marginLeft: 10,
  },
  rightSideUp: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 5,
  },
  rightSideDown: {
    flexDirection: "row",
  },
  title: { color: "#a6a6a1", fontSize: 17 },
  time: { color: "#a6a6a1", fontSize: 14, marginLeft: 10 },
  info: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#a6a6a1",
    padding: 5,
    marginLeft: 5,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    color: "#a6a6a1",
    fontSize: 13,
    marginLeft: 7,
  },
});
