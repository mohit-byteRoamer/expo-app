import mongoose from "mongoose";

const TodoTask = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
});

const Task = mongoose.model("todoTask", TodoTask);
Task.createIndexes();
export default Task;
