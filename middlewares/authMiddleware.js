// backend/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // 👈 MUST include .js

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user || user.status === "inactive") {
      return res.status(401).json({ message: "Access denied" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
