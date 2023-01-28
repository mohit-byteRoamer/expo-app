import Task from "../../models/todoTask.js";
let createUserTask = async function (req, res) {
  console.log(req.user);
  const task = await Task.create({
    user: req.user.id,
    title: req.body.title,
  });
  res.status(200).json({ message: "Task Created" });
};

let updateUserTask = async function (req, res) {};

let deleteUserTask = async function (req, res) {};

let getUserTask = async function (req, res) {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "something want wrong" });
  }
};
export { createUserTask, updateUserTask, deleteUserTask, getUserTask };
