import express from "express";
import { protect } from "../middlewares/authmiddleware.js";
import {
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/userControllers.js";

const router = express.Router();

router.get("/me", protect, getProfile);
router.put("/me", protect, updateProfile);
router.put("/me/password", protect, changePassword);

export default router;
