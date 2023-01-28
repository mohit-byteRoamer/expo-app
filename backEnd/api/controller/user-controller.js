import User from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "Mohitisagoodb$oy";

let signUp = async function (req, res) {
  // Existing User Checker
  // Hashing To passWord
  // User Creation
  // Token Generate
  // const { userName, email, passWord } = req.body;
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ errors: "Sorry User Already Exists Here" });
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
      return res.status(400).json({ message: "user not found" });
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

export { signUp, signIn };
