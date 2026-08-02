import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProgram extends Document {
  title: string;
  description?: string;
  thumbnailMediaId: string;
  galleryMediaIds?: string[];
  price: number;
  duration?: string;
  difficulty: "beginner" | "intermediate" | "advanced" | "all-levels";
  benefits?: string[];
  schedule?: string;
  capacity?: number;
  isPublished: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

const ProgramSchema = new Schema<IProgram>(
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
    thumbnailMediaId: {
      type: String,
      required: true,
    },
    galleryMediaIds: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    duration: {
      type: String,
      trim: true,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["beginner", "intermediate", "advanced", "all-levels"],
      default: "all-levels",
    },
    benefits: {
      type: [String],
      default: [],
    },
    schedule: {
      type: String,
      trim: true,
    },
    capacity: {
      type: Number,
      min: 0,
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
ProgramSchema.index({ isPublished: 1, displayOrder: 1 });
ProgramSchema.index({ difficulty: 1 });
ProgramSchema.index({ createdBy: 1 });
ProgramSchema.index({ createdAt: -1 });

const Program: Model<IProgram> = mongoose.models.Program || mongoose.model<IProgram>("Program", ProgramSchema);

export default Program;
