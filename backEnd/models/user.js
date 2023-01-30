import mongoose from "mongoose";

const UserModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserModel);
User.createIndexes();

export default User;
