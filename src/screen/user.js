import React from "react";
import AuthContext from "../context/auth/authContext";
import TodoContext from "../context/todo/todoContext";
import icon from "../constants/icon";
import {
  StyleSheet,
  Pressable,
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
} from "react-native";

function User(props) {
  const authContext = React.useContext(AuthContext);
  const { userName } = authContext;
  const todoContext = React.useContext(TodoContext);
  const { todoItem, getUserTask, updateUserTask, deleteUserTask, message } =
    todoContext;
  const [currentEditSection, setCurrentEditSection] = React.useState(null);
  const [editValue, setEditValue] = React.useState("");

  let showEditSection = function (key) {
    setCurrentEditSection(key);
  };
  let deleteTodoItem = function (itemId, index) {
    deleteUserTask(itemId, index);
  };

  let updateTodoItem = function (id, updateItem, setCurrentEditSection) {
    updateUserTask(id, updateItem, setCurrentEditSection);
  };

  React.useEffect(() => {
    getUserTask();
  }, []);
  return (
    <ScrollView showsVerticalScrollIndicator={false} persistentScrollbar={true}>
      <View style={style.userRoot}>
        <View style={style.userUpperSection}>
          <Image style={style.profilePic} source={icon.userIcon} />
          <Text style={style.userName}>{userName ? userName : "mohit"}</Text>
          <View style={style.taskInfoBox}>
            <Text>{`User Total Task : 10`}</Text>
          </View>
        </View>
        <View>
          <Text style={style.header}>Your Task</Text>
          <View>
            <Text>Your Task</Text>

            <View>
              {todoItem.length > 0 &&
                todoItem.map((val, key) => {
                  return (
                    <View style={style.todoCard}>
                      <View style={style.upperSection}>
                        <View>
                          <Text style={style.todoCardText} key={key}>
                            {val.title}
                          </Text>
                        </View>
                        {currentEditSection == key ? (
                          <Pressable
                            onPress={() =>
                              updateTodoItem(
                                val._id,
                                editValue,
                                setCurrentEditSection
                              )
                            }
                            style={style.cardButton}
                          >
                            <Text style={style.buttonText}>Update</Text>
                          </Pressable>
                        ) : (
                          <Pressable
                            onPress={() => showEditSection(key)}
                            style={style.cardButton}
                          >
                            <Text style={style.buttonText}>Edit</Text>
                          </Pressable>
                        )}

                        <Pressable
                          onPress={() => deleteTodoItem(val._id, key)}
                          style={style.cardButton}
                        >
                          <Text style={style.buttonText}>Delete</Text>
                        </Pressable>
                      </View>
                      <View>
                        {currentEditSection == key ? (
                          <TextInput
                            style={style.inputEdit}
                            onChangeText={(text) => setEditValue(text)}
                            placeholder="update Item"
                          />
                        ) : null}
                      </View>
                    </View>
                  );
                })}
              <Text style={style.message}>{message ? message : null}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  userRoot: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  userUpperSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  profilePic: {
    margin: 10,
    width: 80,
    height: 80,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  taskInfoBox: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: "grey",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  todoCard: {
    padding: 4,
    margin: 4,
    borderRadius: 4,
    backgroundColor: "black",
  },
  upperSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  todoCardText: {
    fontSize: 16,
    color: "white",
  },
  cardButton: {
    margin: 4,
    borderRadius: 4,
    padding: 4,
    backgroundColor: "#131ACE",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  inputEdit: {
    padding: 4,
    backgroundColor: "white",
  },
  message: {
    color: "green",
    fontWeight: "bold",
  },
});

export default User;
