import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!email.includes("@") || password.length < 6) {
    return res.status(400).json({ message: "Invalid input" });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    token: generateToken(user._id),
    user: { id: user._id, email: user.email, role: user.role },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || user.status === "inactive") {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  user.lastLogin = new Date();
  await user.save();

  res.json({
    token: generateToken(user._id),
    user: { id: user._id, email: user.email, role: user.role },
  });
};

export const getMe = async (req, res) => {
  res.json(req.user);
};
