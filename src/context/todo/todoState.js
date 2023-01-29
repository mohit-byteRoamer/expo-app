import TodoContext from "./todoContext";
import React from "react";
import axios from "../../../axios";
const TodoState = (props) => {
  const host = "http://localhost:3000";
  const [todoItem, setTodoItem] = React.useState([]);
  const [message, setMessage] = React.useState("");

  let getUserTask = () => {
    axios.get(`${host}/task/getUserTask`).then((res) => {
      debugger;
      setTodoItem(res.data);
      console.log(res.data);
    });
  };

  let createUserTask = (title) => {
    axios
      .post(`${host}/task/createUserTask`, {
        title,
      })
      .then((res) => {
        let cloneTodoItem = [...todoItem];
        let item = res.data.task;
        cloneTodoItem.push(item);
        setTodoItem(cloneTodoItem);
        setMessage(res.data.message);
        setTimeout(() => {
          setMessage("");
        }, 1500);
      });
  };

  let updateUserTask = (id, title, offModal) => {
    axios.put(`${host}/task/updateUserTask/${id}`, { title }).then((res) => {
      let todoItemsClone = [...todoItem];
      let updatedtodoItemClone = todoItemsClone.find(
        (i) => i._id == res.data.updateTask._id
      );
      updatedtodoItemClone.title = res.data.updateTask.title;
      setTodoItem(todoItemsClone);
      offModal(null);
      setMessage(res.data.message);
      setTimeout(() => {
        setMessage("");
      }, 1500);
    });
  };

  let deleteUserTask = (id, index) => {
    axios.delete(`${host}/task/deleteUserTask/${id}`).then((res) => {
      const deleteItem = [...todoItem];
      deleteItem.splice(index, 1);
      setTodoItem(deleteItem);
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todoItem,
        message,
        getUserTask,
        createUserTask,
        updateUserTask,
        deleteUserTask,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};
export default TodoState;
