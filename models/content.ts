import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContent extends Document {
  key: string;
  section: "homepage" | "hero" | "about" | "programs" | "contact" | "footer" | "other";
  value: string;
  type: "text" | "html" | "json";
  description?: string;
  updatedAt: Date;
  updatedBy: string;
}

const ContentSchema = new Schema<IContent>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    section: {
      type: String,
      required: true,
      enum: ["homepage", "hero", "about", "programs", "contact", "footer", "other"],
    },
    value: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["text", "html", "json"],
      default: "text",
    },
    description: {
      type: String,
      trim: true,
    },
    updatedBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
ContentSchema.index({ key: 1 });
ContentSchema.index({ section: 1 });
ContentSchema.index({ updatedAt: -1 });

const Content: Model<IContent> = mongoose.models.Content || mongoose.model<IContent>("Content", ContentSchema);

export default Content;
