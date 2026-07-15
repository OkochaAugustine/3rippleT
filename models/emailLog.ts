import mongoose, { Schema } from "mongoose";

const EmailLogSchema = new Schema(
  {
    recipient: { type: String, required: true },
    subject: { type: String, required: true },
    type: {
      type: String,
      enum: ["verification", "welcome", "password_reset", "broadcast"],
      required: true,
    },
    status: {
      type: String,
      enum: ["sent", "failed", "pending"],
      default: "pending",
    },
    error: { type: String, default: "" },
    sentAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export const EmailLog = mongoose.models.EmailLog || mongoose.model("EmailLog", EmailLogSchema);
