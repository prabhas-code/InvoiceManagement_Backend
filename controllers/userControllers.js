import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const getProfile = async (req, res) => {
  res.json(req.user);
};

export const updateProfile = async (req, res) => {
  const { fullName, email } = req.body;

  const user = await User.findById(req.user._id);
  user.fullName = fullName || user.fullName;
  user.email = email || user.email;

  await user.save();
  res.json({ message: "Profile updated" });
};

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);
  const match = await bcrypt.compare(oldPassword, user.password);

  if (!match || newPassword.length < 6) {
    return res.status(400).json({ message: "Invalid password" });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ message: "Password changed successfully" });
};
