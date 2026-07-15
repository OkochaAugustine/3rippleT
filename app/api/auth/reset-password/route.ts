import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/db/mongodb";
import { User } from "@/models/user";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { token, password } = body;

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ resetToken: token });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 },
      );
    }

    // Check if token has expired
    if (!user.resetTokenExpires || user.resetTokenExpires < new Date()) {
      return NextResponse.json(
        { error: "Reset token has expired. Please request a new one." },
        { status: 400 },
      );
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update password and clear reset token
    user.password = hashedPassword;
    user.resetToken = "";
    user.resetTokenExpires = null;
    await user.save();

    return NextResponse.json({
      message: "Password reset successfully",
    });
  } catch (error: unknown) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "An error occurred resetting your password" },
      { status: 500 },
    );
  }
}
