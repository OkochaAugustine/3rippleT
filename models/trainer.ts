import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITrainer extends Document {
  name: string;
  position: string;
  biography?: string;
  experience?: string;
  mediaId: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  specialties?: string[];
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

const TrainerSchema = new Schema<ITrainer>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    position: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    biography: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    experience: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    mediaId: {
      type: String,
      required: true,
    },
    instagram: {
      type: String,
      trim: true,
    },
    facebook: {
      type: String,
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
    specialties: {
      type: [String],
      default: [],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
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
TrainerSchema.index({ isPublished: 1, displayOrder: 1 });
TrainerSchema.index({ isFeatured: 1 });
TrainerSchema.index({ createdBy: 1 });
TrainerSchema.index({ createdAt: -1 });

const Trainer: Model<ITrainer> = mongoose.models.Trainer || mongoose.model<ITrainer>("Trainer", TrainerSchema);

export default Trainer;
