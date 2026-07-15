import mongoose, { Schema } from "mongoose";

const SettingsSchema = new Schema(
  {
    siteName: { type: String, default: "3Ripple T Fitness" },
    siteDescription: { type: String, default: "A premium fitness platform for training, memberships, events, coaching, and community momentum." },
    contactEmail: { type: String, default: "hello@3rippletfitness.com" },
    contactPhone: { type: String, default: "" },
    address: { type: String, default: "" },
    socialLinks: {
      facebook: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
      youtube: { type: String, default: "" },
    },
    businessHours: {
      monday: { type: String, default: "6:00 AM - 10:00 PM" },
      tuesday: { type: String, default: "6:00 AM - 10:00 PM" },
      wednesday: { type: String, default: "6:00 AM - 10:00 PM" },
      thursday: { type: String, default: "6:00 AM - 10:00 PM" },
      friday: { type: String, default: "6:00 AM - 10:00 PM" },
      saturday: { type: String, default: "7:00 AM - 9:00 PM" },
      sunday: { type: String, default: "8:00 AM - 6:00 PM" },
    },
    membershipPricing: {
      daily: { type: Number, default: 3000 },
      weekly: { type: Number, default: 15000 },
      monthly: { type: Number, default: 20000 },
      quarterly: { type: Number, default: 55000 },
      annual: { type: Number, default: 180000 },
      premium: { type: Number, default: 45000 },
    },
    paymentSettings: {
      paystackPublicKey: { type: String, default: "" },
      flutterwavePublicKey: { type: String, default: "" },
    },
    smtpSettings: {
      host: { type: String, default: "" },
      port: { type: Number, default: 587 },
      secure: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  }
);

export const Settings = mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);
