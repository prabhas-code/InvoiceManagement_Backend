import User from "../models/User.js";

export const getUsers = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const users = await User.find().select("-password").skip(skip).limit(limit);

  res.json(users);
};

export const activateUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { status: "active" });
  res.json({ message: "User activated" });
};

export const deactivateUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { status: "inactive" });
  res.json({ message: "User deactivated" });
};
