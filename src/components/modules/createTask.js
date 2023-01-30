import * as React from "react";
import TodoContext from "../../context/todo/todoContext";
import {
  StyleSheet,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Button, Text, View } from "../widgets/widgets";

function CreateTask(props) {
  const todoContext = React.useContext(TodoContext);
  const { createUserTask, message } = todoContext;
  const [todoValue, setTodoValue] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  let createTodo = function (value) {
    if (value.length >= 3) {
      createUserTask(value);
    } else {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
  };
  const handleSignIn = () => {
    return props.navigation.navigate("User");
  };

  return (
    <View style={styles.todoSection}>
      <View style={styles.todoBoxOperation}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setTodoValue(text)}
          value={todoValue}
          placeholder="Add you new todo"
        />
        <Text style={styles.alert}>
          {alert ? "Character length must be above 4" : null}
        </Text>
        <Text style={styles.message}>{message ? message : null}</Text>
        <Button onPress={() => createTodo(todoValue)} text={"Create Task"} />
        <Button onPress={handleSignIn} text={"See All Task"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  todoSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: "white",
  },
  todoBoxOperation: {
    width: "100%",
    padding: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "80%",
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 4,
    padding: 10,
  },
  alert: {
    margin: 4,
    color: "red",
    fontWeight: "bold",
  },
  message: {
    color: "green",
    fontWeight: "bold",
  },
});

export default CreateTask;
