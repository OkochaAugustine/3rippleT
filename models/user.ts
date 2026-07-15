import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true 
    },
    phone: { type: String, default: "" },
    membership: { 
      type: String, 
      enum: ["none", "daily", "monthly", "premium"], 
      default: "none" 
    },
    role: { 
      type: String, 
      enum: ["MEMBER", "ADMIN", "COACH"], 
      default: "MEMBER" 
    },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verificationStatus: { 
      type: String, 
      enum: ["unverified", "verified"], 
      default: "unverified" 
    },
    verificationCode: { type: String, default: "" },
    verificationCodeExpires: { type: Date, default: null },
    resetToken: { type: String, default: "" },
    resetTokenExpires: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
