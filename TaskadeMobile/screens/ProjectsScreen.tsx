import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, Alert } from "react-native";
import TaskListItem from "../components/TaskListItem";
import { Text, View } from "../components/Themed";
import { useQuery, gql } from "@apollo/client";

const MY_PROJECTS = gql`
  query myTaskLists {
    myTaskLists {
      id
      title
      createdAt
      todos {
        id
        content
      }
    }
  }
`;

export default function ProjectsScreen() {
  const [project, setProjects] = useState([]);

  const { data, error, loading } = useQuery(MY_PROJECTS);
  useEffect(() => {
    if (error) {
      Alert.alert("Error fetching projects", error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setProjects(data.myTaskLists);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <FlatList
        data={project}
        renderItem={({ item }) => <TaskListItem project={item} />}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    width: "100%",
  },
});
