import mongoose from "mongoose";

const TodoTask = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const Task = mongoose.model("todoTask", TodoTask);
task.createIndexes();
export default Task;
