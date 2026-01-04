import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true },
    clientName: { type: String, required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Paid", "Unpaid", "Pending"],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", invoiceSchema);
