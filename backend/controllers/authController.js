import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const authController = {
  getUser: async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },

  register: async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ username, email, password: hashedPassword });
      res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    try {
      const user = await User.findOne({ where: { email } });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid email or password." });
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },

  updateUser: async (req, res) => {
    const { username, email, password } = req.body;
    const { id } = req.params;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.update(
        { username, email, password: hashedPassword },
        { where: { id } }
      );
      res.status(200).json({ message: "User updated successfully." });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      await User.destroy({ where: { id } });
      res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },
};

export default authController;
