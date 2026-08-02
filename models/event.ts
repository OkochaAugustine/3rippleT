import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description?: string;
  bannerMediaId: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  registrationDeadline?: Date;
  price?: number;
  capacity?: number;
  isPublished: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    bannerMediaId: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    registrationDeadline: {
      type: Date,
    },
    price: {
      type: Number,
      min: 0,
    },
    capacity: {
      type: Number,
      min: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
EventSchema.index({ isPublished: 1, isArchived: 1, startDate: -1 });
EventSchema.index({ startDate: 1, endDate: 1 });
EventSchema.index({ createdBy: 1 });
EventSchema.index({ createdAt: -1 });

const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default Event;
