import UserModel from "../Model/UserModel.js";
import jwt from "jsonwebtoken";

export const RegisterUser = async (req, res) => {
  try {
    const { username, email, password, confirmpassword } = req.body;
    // * check if exist
    const exist = await UserModel.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // * check the password match confirm password
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // * create user
    const newUser = await UserModel.create({ username, email, password });
    const userWithoutPassword = newUser.toObject();
    delete userWithoutPassword.password;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // * check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // * compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // * generate token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(200).json({
      message: "login successfully",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
