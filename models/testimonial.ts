import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITestimonial extends Document {
  customerName: string;
  customerPosition?: string;
  mediaId?: string;
  rating: number;
  review: string;
  isApproved: boolean;
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    customerPosition: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    mediaId: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    isApproved: {
      type: Boolean,
      default: false,
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
TestimonialSchema.index({ isApproved: 1, isPublished: 1, displayOrder: 1 });
TestimonialSchema.index({ isFeatured: 1 });
TestimonialSchema.index({ rating: -1 });
TestimonialSchema.index({ createdBy: 1 });
TestimonialSchema.index({ createdAt: -1 });

const Testimonial: Model<ITestimonial> = mongoose.models.Testimonial || mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);

export default Testimonial;
