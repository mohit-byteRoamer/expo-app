import { Router } from "express";
// import {}from ""

let api = Router();

api.post("/createTask");
api.get("/getTask");
api.put("/updateTask");
api.delete("/deleteTask");
