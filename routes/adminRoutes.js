import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/roleMiddleware.js";
import {
  getUsers,
  activateUser,
  deactivateUser,
} from "../controllers/adminControllers.js";

const router = express.Router();

router.get("/users", protect, isAdmin, getUsers);
router.patch("/users/:id/activate", protect, isAdmin, activateUser);
router.patch("/users/:id/deactivate", protect, isAdmin, deactivateUser);

export default router;
