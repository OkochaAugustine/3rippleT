import { NextResponse } from "next/server";
import crypto from "crypto";
import { dbConnect } from "@/lib/db/mongodb";
import { User } from "@/models/user";
import { sendResetPasswordEmail } from "@/lib/email/nodemailer";
import { EmailLog } from "@/models/emailLog";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Don't reveal if email exists for security
      return NextResponse.json({
        message: "If an account exists with this email, a password reset link has been sent.",
      });
    }

    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    user.resetToken = resetToken;
    user.resetTokenExpires = resetTokenExpires;
    await user.save();

    // Send reset password email & log status
    try {
      await sendResetPasswordEmail(user.email, user.name, resetToken);
      await EmailLog.create({
        recipient: user.email,
        subject: "Reset your 3Ripple T Fitness password",
        type: "password_reset",
        status: "sent",
      });
    } catch (err: unknown) {
      console.error("Forgot password email delivery failed:", err);
      await EmailLog.create({
        recipient: user.email,
        subject: "Reset your 3Ripple T Fitness password",
        type: "password_reset",
        status: "failed",
        error: err instanceof Error ? err.message : String(err),
      });
    }

    return NextResponse.json({
      message: "If an account exists with this email, a password reset link has been sent.",
    });
  } catch (error: unknown) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "An error occurred processing your request" },
      { status: 500 },
    );
  }
}
