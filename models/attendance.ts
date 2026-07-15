import mongoose, { Schema } from "mongoose";

const AttendanceSchema = new Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    date: { type: Date, required: true },
    checkInTime: { type: Date, required: true },
    checkOutTime: { type: Date, default: null },
    classId: { type: String, default: "" },
    className: { type: String, default: "" },
    duration: { type: Number, default: 0 }, // in minutes
    notes: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export const Attendance = mongoose.models.Attendance || mongoose.model("Attendance", AttendanceSchema);
