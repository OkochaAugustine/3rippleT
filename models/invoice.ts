import { Schema, models, model } from "mongoose";

const InvoiceSchema = new Schema(
  {
    invoiceId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    userName: {
      type: String,
      required: true,
      trim: true,
    },

    userEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "NGN",
    },

    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
      index: true,
    },

    planId: {
      type: String,
      required: true,
    },

    planName: {
      type: String,
      required: true,
    },

    paymentProvider: {
      type: String,
      default: "",
    },

    paymentReference: {
      type: String,
      default: "",
      index: true,
    },

    receiptUrl: {
      type: String,
      default: "",
    },

    paidAt: {
      type: Date,
      default: null,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const Invoice =
  models.Invoice || model("Invoice", InvoiceSchema);