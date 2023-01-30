import { Router } from "express";
import {
  signUp,
  signIn,
  forgetPassword,
  resetPassword,
} from "../controller/user-controller.js";
let api = Router();

api.post("/signUp", signUp);
api.post("/signIn", signIn);
api.post("/forgetPassword", forgetPassword);
api.post("/resetPassword", resetPassword);

export default api;
