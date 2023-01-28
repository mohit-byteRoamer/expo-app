import Task from "../../models/todoTask.js";
let createUserTask = async function (req, res) {
  console.log(req.user);
  const task = await Task.create({
    user: req.user.id,
    title: req.body.title,
  });
  res.status(200).json({ message: "Task Created" });
};

let updateUserTask = async function (req, res) {
  const id = req.params.id;
  const { title } = req.body;
  const newTask = {
    title,
  };

  try {
    await Task.findByIdAndUpdate(id, newTask, { new: true });
    res.status(200).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "something want wrong" });
  }
};

let deleteUserTask = async function (req, res) {
  const id = req.params.id;
  try {
    const deleteTask = await Task.findByIdAndRemove(id);
    res.status(202).json({ message: "your task is deleted" });
  } catch (error) {
    res.status(500).json({ message: "something want wrong" });
  }
};

let getUserTask = async function (req, res) {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "something want wrong" });
  }
};
export { createUserTask, updateUserTask, deleteUserTask, getUserTask };
