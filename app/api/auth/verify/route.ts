import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/mongodb";
import { User } from "@/models/user";
import { sendWelcomeEmail } from "@/lib/email/nodemailer";
import { EmailLog } from "@/models/emailLog";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { email, code } = body;

    if (!email || !code) {
      return NextResponse.json(
        { error: "Email and verification code are required" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 },
      );
    }

    // Prevent duplicate verification
    if (user.isVerified) {
      return NextResponse.json(
        { error: "Account is already verified" },
        { status: 400 },
      );
    }

    if (user.verificationCode !== code) {
      return NextResponse.json(
        { error: "Invalid verification code" },
        { status: 400 },
      );
    }

    // Check if code has expired
    if (user.verificationCodeExpires && user.verificationCodeExpires < new Date()) {
      return NextResponse.json(
        { error: "Verification code has expired. Please request a new code." },
        { status: 400 },
      );
    }

    // Mark as verified
    user.isVerified = true;
    user.verificationStatus = "verified";
    user.verificationCode = "";
    user.verificationCodeExpires = null;
    await user.save();

    // Send welcome email & log status
    try {
      await sendWelcomeEmail(user.email, user.name, user.membership);
      await EmailLog.create({
        recipient: user.email,
        subject: "Welcome to 3Ripple T Fitness!",
        type: "welcome",
        status: "sent",
      });
    } catch (err: unknown) {
      console.error("Welcome email delivery failed:", err);
      await EmailLog.create({
        recipient: user.email,
        subject: "Welcome to 3Ripple T Fitness!",
        type: "welcome",
        status: "failed",
        error: err instanceof Error ? err.message : String(err),
      });
    }

    return NextResponse.json({
      message: "Email verified successfully",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        membership: user.membership,
        role: user.role,
        isVerified: user.isVerified,
        verificationStatus: user.verificationStatus,
      },
    });
  } catch (error: unknown) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "An error occurred during verification" },
      { status: 500 },
    );
  }
}
