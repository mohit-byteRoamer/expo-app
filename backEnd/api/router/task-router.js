import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  createUserTask,
  updateUserTask,
  deleteUserTask,
  getUserTask,
} from "../controller/task-controller.js";
let api = Router();

api.post("/createUserTask", auth, createUserTask);
api.put("/updateUserTask/:id", auth, updateUserTask);
api.delete("/deleteUserTask/:id", auth, deleteUserTask);
api.get("/getUserTask", auth, getUserTask);

export default api;
