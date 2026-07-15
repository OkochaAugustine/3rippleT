import mongoose, { Schema } from "mongoose";

const NotificationSchema = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ["membership", "booking", "payment", "password", "announcement", "system"],
      default: "system",
    },
    read: { type: Boolean, default: false },
    actionUrl: { type: String, default: "" },
    metadata: { type: Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: true,
  }
);

export const Notification = mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);
