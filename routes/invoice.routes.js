import express from "express";
import Invoice from "../models/Invoice.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const invoice = await Invoice.create({
    ...req.body,
    user: req.user._id,
  });
  res.json(invoice);
});

router.get("/", protect, async (req, res) => {
  const invoices = await Invoice.find({ user: req.user._id });
  res.json(invoices);
});

router.put("/:id", protect, async (req, res) => {
  const invoice = await Invoice.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );
  res.json(invoice);
});

router.delete("/:id", protect, async (req, res) => {
  await Invoice.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  res.json({ message: "Invoice deleted" });
});

export default router;
