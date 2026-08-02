import mongoose, { Schema, Document, Model } from "mongoose";

export interface IHeroSlide extends Document {
  title: string;
  subtitle?: string;
  mediaId: string;
  mediaType: "image" | "video";
  videoUrl?: string;
  posterUrl?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  overlayOpacity: number;
  displayOrder: number;
  isPublished: boolean;
  autoplay: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

const HeroSlideSchema = new Schema<IHeroSlide>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    subtitle: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    mediaId: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      required: true,
      enum: ["image", "video"],
    },
    videoUrl: {
      type: String,
    },
    posterUrl: {
      type: String,
    },
    primaryCtaText: {
      type: String,
      trim: true,
    },
    primaryCtaLink: {
      type: String,
      trim: true,
    },
    secondaryCtaText: {
      type: String,
      trim: true,
    },
    secondaryCtaLink: {
      type: String,
      trim: true,
    },
    overlayOpacity: {
      type: Number,
      default: 0.5,
      min: 0,
      max: 1,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    autoplay: {
      type: Boolean,
      default: true,
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
HeroSlideSchema.index({ isPublished: 1, displayOrder: 1 });
HeroSlideSchema.index({ createdBy: 1 });
HeroSlideSchema.index({ createdAt: -1 });

const HeroSlide: Model<IHeroSlide> = mongoose.models.HeroSlide || mongoose.model<IHeroSlide>("HeroSlide", HeroSlideSchema);

export default HeroSlide;
