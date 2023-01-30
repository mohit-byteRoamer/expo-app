import User from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../middleware/sendMail.js";
import randomstring from "randomstring";

const SECRET_KEY = "Mohitisagoodb$oy";

let signUp = async function (req, res) {
  // Existing User Checker
  // Hashing To passWord
  // User Creation
  // Token Generate
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ message: "Sorry User Already Exists Here" });
    }

    const salt = await bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    //create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

    let data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, SECRET_KEY);
    console.log(authToken);
    res.json({ user, authToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

let signIn = async function (req, res) {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }
    const checkPassword = await bcrypt.compare(password, existingUser.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "please check your password" });
    }
    let data = {
      user: {
        id: existingUser.id,
      },
    };
    const authToken = jwt.sign(data, SECRET_KEY);
    res.json({ existingUser, authToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

let forgetPassword = async function (req, res) {
  try {
    const email = req.body.email;
    const existingUser = await User.findOne({ email: email });
    const userId = existingUser._id;

    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }
    const Randomstring = randomstring.generate();
    const data = await User.updateOne(
      { email: email },
      { $set: { token: Randomstring } }
    );
    console.log(Randomstring);
    sendEmail(email, userId, Randomstring);
    res.status(200).json({
      message: "Please check your inbox of mail and reset your password",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const resetPassword = async function (req, res) {
  try {
    const token = req.query.token;
    const userId = req.query.id;
    const tokenData = await User.findOne({ token: token });
    if (tokenData) {
      const salt = await bcrypt.genSaltSync(10);
      const newPassword = await bcrypt.hash(req.body.password, salt);

      const userData = await User.findByIdAndUpdate(
        userId,
        { $set: { password: newPassword, token: "" } },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "User Password has been reset", data: userData });
    } else {
      res.status(200).json({ message: "This link has been expired" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { signUp, signIn, forgetPassword, resetPassword };
