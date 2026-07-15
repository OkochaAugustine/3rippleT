import mongoose, { Schema } from "mongoose";

const InvoiceSchema = new Schema(
  {
    invoiceId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "NGN" },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    planId: { type: String, required: true },
    planName: { type: String, required: true },
    paymentProvider: { type: String, default: "" },
    paymentReference: { type: String, default: "" },
    receiptUrl: { type: String, default: "" },
    paidAt: { type: Date, default: null },
    dueDate: { type: Date, required: true },
    notes: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export const Invoice = mongoose.models.Invoice || mongoose.model("Invoice", InvoiceSchema);
