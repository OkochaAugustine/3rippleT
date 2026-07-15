import mongoose, { Schema } from "mongoose";

const BookingSchema = new Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    classId: { type: String, required: true },
    className: { type: String, required: true },
    classDate: { type: Date, required: true },
    classTime: { type: String, required: true },
    instructor: { type: String, required: true },
    status: {
      type: String,
      enum: ["confirmed", "cancelled", "completed", "no_show"],
      default: "confirmed",
    },
    attended: { type: Boolean, default: false },
    notes: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export const Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
