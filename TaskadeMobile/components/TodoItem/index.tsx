import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useMutation, gql } from "@apollo/client";
import CheckBox from "../CheckBox";

interface TodoItemProps {
  todo: {
    id: string;
    content: string;
    isCompleted: boolean;
  };
  onSubmit: () => void;
}

const UPDATE_TODO = gql`
  mutation updateToDo($id: ID!, $content: String, $isCompleted: Boolean) {
    updateToDo(id: $id, content: $content, isCompleted: $isCompleted) {
      id
      content
      isCompleted
      taskList {
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

export default function TodoItem({ todo, onSubmit }: TodoItemProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [content, setContent] = useState("");
  const input = useRef(null);

  const [updateItem] = useMutation(UPDATE_TODO);

  const callUpdateItem = () => {
    updateItem({
      variables: {
        id: todo.id,
        content,
        isCompleted: isChecked,
      },
    });
  };

  useEffect(() => {
    if (!todo) {
      return;
    }
    setIsChecked(todo.isCompleted);
    setContent(todo.content);
  }, [todo]);

  useEffect(() => {
    if (input.current) {
      input?.current?.focus();
    }
  }, [input]);

  const onKeyPress = ({ nativeEvent }) => {
   //  if (nativeEvent.key === "Backspace" && content === "") {
   //    // delete item
   //    console.warn("delete item");
   //  }
    console.log(nativeEvent)
  };

  return (
    <View style={styles.row}>
      <CheckBox
        isChecked={isChecked}
        onPress={() => {
          setIsChecked(!isChecked);
          callUpdateItem();
        }}
      />
      <TextInput
        style={styles.textInput}
        multiline
        value={content}
        onChangeText={setContent}
        onSubmitEditing={onSubmit}
        blurOnSubmit
        ref={input}
        onKeyPress={onKeyPress}
        onEndEditing={callUpdateItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    color: "#a6a6a1",
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#403e36",
    borderRadius: 3,
    padding: 5,
  },
});
