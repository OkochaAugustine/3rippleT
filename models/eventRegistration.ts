import mongoose, { Schema, Model, Document } from "mongoose";

export interface IEventRegistration extends Document {
  registrationCode: string;
  eventId: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  gender: string;
  location: string;
  fitnessExperience: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const EventRegistrationSchema = new Schema<IEventRegistration>(
  {
    registrationCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    eventId: {
      type: String,
      required: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    fitnessExperience: {
      type: String,
      required: true,
      enum: ["beginner", "intermediate", "advanced"],
    },
    emergencyContactName: {
      type: String,
      required: true,
      trim: true,
    },
    emergencyContactPhone: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
EventRegistrationSchema.index({ eventId: 1, status: 1 });
EventRegistrationSchema.index({ email: 1, eventId: 1 });
EventRegistrationSchema.index({ createdAt: -1 });

const EventRegistration: Model<IEventRegistration> =
  mongoose.models.EventRegistration ||
  mongoose.model<IEventRegistration>("EventRegistration", EventRegistrationSchema);

export default EventRegistration;
