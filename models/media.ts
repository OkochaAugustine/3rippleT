import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMedia extends Document {
  title: string;
  category: "hero" | "gallery" | "program" | "class" | "trainer" | "event" | "testimonial" | "about" | "marketing" | "other";
  description?: string;
  altText: string;
  url: string;
  thumbnailUrl?: string;
  fileSize: number;
  mimeType: string;
  width?: number;
  height?: number;
  displayOrder: number;
  isPublished: boolean;
  isFeatured: boolean;
  uploadedBy: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema = new Schema<IMedia>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    category: {
      type: String,
      required: true,
      enum: ["hero", "gallery", "program", "class", "trainer", "event", "testimonial", "about", "marketing", "other"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    altText: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    url: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    uploadedBy: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
MediaSchema.index({ category: 1, isPublished: 1, displayOrder: 1 });
MediaSchema.index({ uploadedBy: 1 });
MediaSchema.index({ tags: 1 });
MediaSchema.index({ createdAt: -1 });

const Media: Model<IMedia> = mongoose.models.Media || mongoose.model<IMedia>("Media", MediaSchema);

export default Media;
