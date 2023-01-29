import * as React from "react";
import TodoContext from "../context/todo/todoContext";
import {
  StyleSheet,
  Pressable,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
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
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>See All Task</Text>
      </TouchableOpacity>
      <View style={styles.todoBoxOperation}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setTodoValue(text)}
          value={todoValue}
          placeholder="Add you new todo"
        />
        <Pressable onPress={() => createTodo(todoValue)} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
      <Text style={styles.alert}>
        {alert ? "Character length must be above 3" : null}
      </Text>
      <Text style={styles.message}>{message ? message : null}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  todoSection: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: "white",
  },
  todoBoxOperation: {
    padding: 6,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 4,
  },
  input: {
    padding: 6,
  },
  button: {
    borderWidth: 2,
    margin: 10,
    padding: 4,
    borderColor: "black",
    borderRadius: 4,
    backgroundColor: "#131ACE",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },

  alert: {
    color: "red",
    fontWeight: "bold",
  },
  message: {
    color: "green",
    fontWeight: "bold",
  },
});

export default CreateTask;
