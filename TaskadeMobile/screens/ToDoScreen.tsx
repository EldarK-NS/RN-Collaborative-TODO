import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Pressable,
} from "react-native";
import TodoItem from "../components/TodoItem";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useRoute } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

// let id = "101";

const GET_PROJECT = gql`
  query getTaskList($id: ID!) {
    getTaskList(id: $id) {
      id
      createdAt
      title
      todos {
        id
        content
        isCompleted
      }
    }
  }
`;

const CREATE_TODO = gql`
  mutation createToDo($content: String!, $taskListId: ID!) {
    createToDo(content: $content, taskListId: $taskListId) {
      id
      content
      isCompleted
      taskList {
        id
        title
        progress
        todos {
          id
          content
          isCompleted
        }
      }
    }
  }
`;

export default function ToDoScreen() {
  const [project, setProject] = useState(null);
  const [title, setTitle] = useState("");

  const route = useRoute();

  const id = route?.params?.id;

  const { data, error, loading } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  const [createTodo, { data: createTodoData, error: createTodoError }] =
    useMutation(CREATE_TODO, { refetchQueries: GET_PROJECT });

  useEffect(() => {
    if (error) {
      console.log(error);
      Alert.alert("Error fetching project", error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setProject(data.getTaskList);
      setTitle(data.getTaskList.title);
    }
  }, [data]);

  const createNewItem = (atIndex: number) => {
    createTodo({
      variables: {
        content: "",
        taskListid: id,
      },
    });
  };

  if (!project) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <TextInput
        style={styles.title}
        value={title}
        onChangeText={setTitle}
        placeholder={"title"}
        placeholderTextColor="#5c5c5c"
      />
      <FlatList
        data={project.todos}
        renderItem={({ item, index }) => (
          <TodoItem todo={item} onSubmit={() => createNewItem(index + 1)} />
        )}
        style={styles.list}
      />
    </KeyboardAvoidingView>
  );
}

export const screenOptions = (props: any) => {
  return {
    headerRight: () => (
      <Pressable
        style={styles.button}
      //   onPress={() => createNewItem(props.route.params.todos.length + 1)}
      >
        <Entypo name="plus" size={24} color="white" style={styles.icon} />
      </Pressable>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    width: "100%",
    color: "#a6a6a1",
    padding: 5,
    //  backgroundColor:'red',
  },
  list: {
    width: "100%",
  },
  button: {
    borderWidth: 1,
    borderColor: "#75746e",
    borderRadius: 40,
    marginRight: 20,
    backgroundColor: "orange",
  },
  icon: {
    padding: 5,
  },
});
