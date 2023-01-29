import express from "express";
import userApi from "./api/router/user-router.js";
import taskApi from "./api/router/task-router.js";
import ConnectDB from "./db.js";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json()); //JSON converts Body data in JSON format
app.use("/user", userApi);
app.use("/task", taskApi);

app.listen(3000, () => {
  console.log("Server is Ready");
  ConnectDB();
});
