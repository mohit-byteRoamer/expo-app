import TodoContext from "./todoContext";
import React from "react";
import axios from "../../../axios";
const TodoState = (props) => {
  const host = "http://localhost:3000";
  const [todoItem, setTodoItem] = React.useState([]);

  let getUserTask = () => {
    axios.get(`${host}/task/getUserTask`).then((res) => {
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
        setTodoItem(todoItem.concat(res.data));
      });
  };

  let updateUserTask = (id, title) => {
    axios.put(`${host}/task/updateUserTask/${id}`, { title }).then((res) => {
      let todoItemsClone = [...todoItem];
      let updatedtodoItemClone = todoItemsClone.find(
        (i) => i._id == res.data.note._id
      ); // Error
      updatedtodoItemClone.title = res.data.note.title;
      setNotes(todoItemsClone);
    });
  };

  let deleteUserTask = (id) => {
    axios.delete(`${host}/task/deleteUserTask/${id}`).then((res) => {
      const newNotes = notes.filter((note) => {
        return note._id !== res.data._id;
      });
      setNotes(newNotes);
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todoItem,
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
