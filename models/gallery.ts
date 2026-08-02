import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGallery extends Document {
  title: string;
  description?: string;
  mediaId: string;
  displayOrder: number;
  isPublished: boolean;
  isFeatured: boolean;
  category?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

const GallerySchema = new Schema<IGallery>(
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
      maxlength: 1000,
    },
    mediaId: {
      type: String,
      required: true,
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
    category: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
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
GallerySchema.index({ isPublished: 1, displayOrder: 1 });
GallerySchema.index({ isFeatured: 1 });
GallerySchema.index({ category: 1 });
GallerySchema.index({ createdBy: 1 });
GallerySchema.index({ createdAt: -1 });

const Gallery: Model<IGallery> = mongoose.models.Gallery || mongoose.model<IGallery>("Gallery", GallerySchema);

export default Gallery;
